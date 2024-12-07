import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private loggerInfo: Logger;
  private loggerError: Logger;
  private loggerWarn: Logger;
  private loggerAll: Logger;

  constructor() {
    this.createLoggers();
    this.replaceConsole();
  }

  createLoggers() {
    const textFormat = format.printf((log) => {
      return `${log.timestamp} - [${log.level.toUpperCase().charAt(0)}] ${log.message}`;
    });

    const dateFormat = format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    });

    this.loggerInfo = createLogger({
      level: 'info',
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'log/info/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
          // zippedArchive: true,
        }),
      ],
    });

    this.loggerError = createLogger({
      level: 'error',
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'log/error/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
          // zippedArchive: true,
        }),
      ],
    });

    this.loggerWarn = createLogger({
      level: 'warn',
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'log/warn/warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
          // zippedArchive: true,
        }),
      ],
    });

    this.loggerAll = createLogger({
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'log/all/all-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
          // zippedArchive: true,
        }),
        new transports.Console(),
      ],
    });
  }

  replaceConsole() {
    console.log = (message: any, params: any) => {
      if (params) {
        this.loggerInfo.info(message + ' ' + JSON.stringify(params));
        this.loggerAll.info(message + ' ' + JSON.stringify(params));
      } else {
        this.loggerInfo.info(message);
        this.loggerAll.info(message);
      }
    };

    console.error = (message: any, params: any) => {
      if (params) {
        this.loggerError.error(message + ' ' + JSON.stringify(params));
        this.loggerAll.error(message + ' ' + JSON.stringify(params));
      } else {
        this.loggerError.error(message);
        this.loggerAll.error(message);
      }
    };

    console.warn = (message: any, params: any) => {
      if (params) {
        this.loggerWarn.warn(message + ' ' + JSON.stringify(params));
        this.loggerAll.warn(message + ' ' + JSON.stringify(params));
      } else {
        this.loggerWarn.warn(message);
        this.loggerAll.warn(message);
      }
    };
  }

  log(message: string) {
    this.loggerInfo.info(message);
    this.loggerAll.info(message);
  }

  error(message: string) {
    this.loggerError.error(message);
    this.loggerAll.error(message);
  }

  warn(message: string) {
    this.loggerWarn.warn(message);
    this.loggerAll.warn(message);
  }

  debug(message: string) {}

  verbose(message: string) {}
}
