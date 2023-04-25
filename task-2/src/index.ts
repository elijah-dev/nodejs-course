import express from "express";
import chalk from "chalk";
import { apiRouter, authRouter } from "@routes";
import bodyParser from "body-parser";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { registerDataSource } from "@services";
import { entities } from "@model";
import { errorHandler, requestLogger } from "@middleware";
import { logger, unhandledErrorLoger } from "@loggers";
import { initAuth } from "@auth";
import passport from "passport";
import { keyProvider } from "@providers";

unhandledErrorLoger.init();

keyProvider.init();

export const dataSource = new DataSource({
  type: "postgres",
  ...keyProvider.getDbKeys(),
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

    app.listen(keyProvider.port, () => {
      logger.info(chalk.green("Listening on port " + chalk.bold(keyProvider.port)));
    });
  })
  .catch((error) => {
    throw new Error(error);
  });
