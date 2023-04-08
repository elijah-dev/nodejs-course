import { defaultDateTimeFormat } from "@constants";
import { httpLogger } from "@loggers";
import { format } from "date-fns";
import type { RequestHandler, Response } from "express";
import type { LogEntry } from "winston";

const onFinish = (res: Response, logEntry: LogEntry) => {
  logEntry.status = res.statusCode;
  logEntry.finished = format(new Date(), defaultDateTimeFormat);

  httpLogger.log(logEntry);
};

export const requestLogger: RequestHandler = (req, res, next) => {
  const logEntry: LogEntry = {
    level: "http",
    message: "",
    url: req.url,
    method: req.method,
    started: format(new Date(), defaultDateTimeFormat),
  };

  res.addListener("finish", () => {
    onFinish(res, logEntry);
  });

  next();
};
