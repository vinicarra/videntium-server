import winston from "winston";

export class Logger {
  private static instance: Logger;
  private static winstonLogger: winston.Logger;

  private constructor() {}

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
      Logger.winstonLogger = winston.createLogger({
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: "combined.log" }),
        ],
      });
    }
    return Logger.winstonLogger;
  }
}
