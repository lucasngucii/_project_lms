import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
@Injectable()
export class WinstonLogger {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    this.initializeLogger();
  }
  private initializeLogger() {
    const logLevel = this.configService.get<string>('LOG_LEVEL');

    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(
              ({ timestamp, level, message, context, trace, ...meta }) => {
                return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}${
                  Object.keys(meta).length ? `\n${JSON.stringify(meta)}` : ''
                }`;
              },
            ),
          ),
        }),
      ],
    });
  }

  log(level: string, message: any, meta: any) {
    this.logger.log(level, message, meta);
  }
}
