import { createLogger, transports, format } from "winston";

// Define log levels and their corresponding colors
const logLevels = {
  error: "red",
  warn: "yellow",
  info: "green",
  verbose: "cyan",
  debug: "blue",
};

const options = {
  file: {
    filename: "error.log",
    level: "error",
  },
  console: {
    level: "silly",
  },
};

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: "combine.log",
      level: "info",
    }),
  ],
});

export default logger;