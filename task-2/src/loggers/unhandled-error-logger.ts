import { createLogger, transports, format } from "winston";
import { formatTimestamp, getLogFileName } from "./utils";
import type { FormatProps } from "./types";

const { printf, combine, colorize, timestamp } = format;

const formatOutput = printf((info) => {
  const { timestamp, message, stack } = info as FormatProps;

  return `${timestamp} ${message}\n${stack}`;
});

export const unhandledErrorLoger = {
  init() {
    createLogger({
      level: "error",
      format: combine(formatTimestamp, formatOutput),
      exceptionHandlers: [
        new transports.File({
          filename: getLogFileName("exceptions"),
        }),
      ],
      rejectionHandlers: [
        new transports.File({
          filename: getLogFileName("rejections"),
        }),
      ],
    });
  },
};
