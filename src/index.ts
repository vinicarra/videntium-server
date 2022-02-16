import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { createConnection, getConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import * as firebase from "firebase-admin";
import { UserResolver } from "./core/resolvers/UserResolver";
import { ShowResolver } from "./core/resolvers/ShowResolver";
import { Logger } from "./core/utils/Logger";
import { AuthController } from "./core/controllers/Auth";

import firebaseAdminCredentials from "../firebaseAdminCredentials.json";

const startServer = async () => {
  const app = express();

  // Middlewares
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
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerLoaderPlugin({ typeormGetConnection: getConnection }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  // Routes
  app.post("/auth/fake_user", AuthController.fakeUser);
  app.post("/auth/fake_login", AuthController.fakeLogin);
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
      firebase.initializeApp({
        // @ts-ignore
        credential: firebase.credential.cert(firebaseAdminCredentials),
      });
      await startServer();
    } catch (e) {
      Logger.getInstance().error("Failed to create server: " + e);
    }
  })
  .catch((e) => {
    Logger.getInstance().error("Failed to connect to database: " + e);
  });
