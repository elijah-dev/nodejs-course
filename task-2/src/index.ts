/* eslint-disable @typescript-eslint/naming-convention */
import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import { router as apiRouter } from "@routes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { registerDataSource } from "@services";
import { entities } from "@model";
import { errorHandler } from "@middleware";

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
    console.log(chalk.blue("Database connected successfully"));
    await dataSource.synchronize();

    registerDataSource(dataSource);

    const app = express();

    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/api", apiRouter);

    app.get("*", (req, res) => {
      res.status(404);
      res.send(`Path ${req.path} is not found!`);
    });

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log("Listening on port " + chalk.green(PORT));
    });
  })
  .catch((error) => {
    console.error(error);

    throw new Error(error);
  });
