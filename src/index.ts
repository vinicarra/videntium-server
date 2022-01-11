import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./core/resolvers/UserResolver";
import { ShowResolver } from "./core/resolvers/ShowResolver";
import { Logger } from "./core/utils/Logger";
import { AuthController } from "./core/controllers/Auth";

const startServer = async () => {
  const app = express();
  app.use(compression());
  app.use(bodyParser.json());
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [ShowResolver, UserResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.post("/auth/authorize", AuthController.authorize);
  app.post("/auth/refresh", AuthController.refresh);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.SERVER_PORT }, resolve)
  );
  Logger.getInstance().info(
    `Server started at http://localhost:${process.env.SERVER_PORT}/graphql`
  );
};

// Create database connection
createConnection()
  .then(async () => {
    try {
      await startServer();
    } catch (e) {
      Logger.getInstance().error("Failed to create server: " + e);
    }
  })
  .catch((e) => {
    Logger.getInstance().error("Failed to connect to database: " + e);
  });
