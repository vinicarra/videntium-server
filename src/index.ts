import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import winston from "winston";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./core/resolvers/UserResolver";
import { ShowResolver } from "./core/resolvers/ShowResolver";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const startServer = async () => {
  const app = express();
  app.use(compression());
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

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.SERVER_PORT }, resolve)
  );
  logger.info(
    `Server started at http://localhost:${process.env.SERVER_PORT}/graphql`
  );
};

// Create database connection
createConnection()
  .then(async () => {
    try {
      await startServer();
    } catch (e) {
      logger.error("Failed to create server: " + e);
    }
  })
  .catch((e) => {
    logger.error("Failed to connect to database: " + e);
  });
