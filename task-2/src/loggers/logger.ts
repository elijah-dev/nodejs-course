import { createLogger, transports, format } from "winston";
import { formatTimestamp } from "./utils";
import type { FormatProps } from "./types";

const { printf, combine, colorize, } = format;

const formatOutput = printf((info) => {
  const { level, timestamp, message, label, stack } = info as FormatProps;

  const formattedLabel = label ? `[${label}] ` : "";
  const formattedStack = stack ? `\n${stack}` : "";

  return `${timestamp} ${level} ${formattedLabel}${message}${formattedStack}`;
});

export const logger = createLogger({
  level: "http",
  format: combine(colorize(), formatTimestamp, formatOutput),
  transports: [new transports.Console()],
});
