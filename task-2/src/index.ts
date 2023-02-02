import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import { router as apiRouter } from "@routes";
import bodyParser from "body-parser";

const port = 3333;
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.status(404);
  res.send(`Path ${req.path} is not found!`);
});

app.listen(port, () => {
  console.log("Listening on port " + chalk.green(port));
});
