import { createLogger, transports, format } from "winston";
import type { FormatProps } from "./types";
import chalk from "chalk";

const { printf, combine } = format;

const formatOutput = printf((info) => {
  const { url, method, started, finished, status } = info as FormatProps;
  const statusCode = Number(status);

  let colorizedStatus = chalk.blue(status);

  if (statusCode >= 200 && statusCode < 300) {
    colorizedStatus = chalk.green(status);
  }

  if (Number(status) >= 400) {
    colorizedStatus = chalk.red(status);
  }

  return `${chalk.bold(method)} ${url} ${colorizedStatus} started: ${started} finished: ${finished}`;
});

export const httpLogger = createLogger({
  level: "http",
  format: combine(formatOutput),
  transports: [new transports.Console()],
});
