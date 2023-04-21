/* eslint-disable @typescript-eslint/naming-convention */
import express from "express";
import chalk from "chalk";
import { apiRouter, authRouter } from "@routes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { registerDataSource } from "@services";
import { entities } from "@model";
import { errorHandler, requestLogger } from "@middleware";
import { logger, unhandledErrorLoger } from "@loggers";
import { initAuth } from "@auth";
import passport from "passport";

unhandledErrorLoger.init();

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_NAME, DB_PASSWORD, PORT } =
  process.env;

if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USERNAME || !DB_PASSWORD || !PORT) {
  throw new Error("Failed to load environment variables");
}

export const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities,
});

dataSource
  .initialize()
  .then(async () => {
    logger.info("Database connected successfully");
    await dataSource.synchronize();

    registerDataSource(dataSource);

    initAuth();

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(requestLogger);

    app.use("/auth", authRouter);
    app.use(
      "/api",
      passport.authenticate("jwt", { session: false }),
      apiRouter
    );

    app.get("*", (req, res) => {
      res.status(404);
      res.send(`Path ${req.path} is not found!`);
    });

    app.use(errorHandler);

    app.listen(PORT, () => {
      logger.info(chalk.green("Listening on port " + chalk.bold(PORT)));
    });
  })
  .catch((error) => {
    throw new Error(error);
  });
