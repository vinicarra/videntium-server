import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import winston from "winston";
import { createConnection, getConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./core/resolvers/Book";
import { Book } from "./core/entities/Book";

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
    resolvers: [BookResolver],
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
    `Server's started at http://localhost:${process.env.SERVER_PORT}/graphql`
  );
};

// Create database connection
createConnection({
  type: "postgres",
  url: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  entities: ["src/**/*.ts"],
})
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
