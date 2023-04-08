import { format } from "date-fns";
import winston from "winston";

export const getLogFileName = (folderName: string) =>
  `logs/${folderName}/${format(new Date(), "dd-MM-yyyy_HH-mm-ss-SSSXXXX")}.log`;

export const formatTimestamp = winston.format.timestamp({
  format: "dd-MM-YYYY HH:mm:ss.SSS",
});
