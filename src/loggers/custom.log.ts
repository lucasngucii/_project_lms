import { Global, Injectable, LoggerService } from '@nestjs/common';
import { ILogger } from './logger.interface';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from './winston';
import { DiscordLogger } from './discord';
@Global()
@Injectable()
export class CustomLogger implements LoggerService, ILogger {
   private context: string;
   constructor(
      private readonly configService: ConfigService,
      private winstonLogger: WinstonLogger,
      private discordLogger: DiscordLogger,
   ) {}
   setContext(context: string): void {
      this.context = context;
   }
   log(message: any, context?: string) {
      context = context || this.context;
      this.winstonLogger.log('info', message, { context });
   }
   error(message: any, trace?: string, context?: string) {
      context = context || this.context;
      this.winstonLogger.log('error', message, { context, trace });
   }
   warn(message: any, context?: string) {
      context = context || this.context;
      console.log('test')
      this.winstonLogger.log('warn', message, { context });
      this.sendToDiscord('WARN', message, context);
   }

   debug(message: any, context?: string) {
      context = context || this.context;
      this.winstonLogger.log('debug', message, { context });
      this.sendToDiscord('DEBUG', message, context);
   }

   verbose(message: any, context?: string) {
      context = context || this.context;
      this.winstonLogger.log('verbose', message, { context });
      this.sendToDiscord('VERBOSE', message, context);
   }

   private sendToDiscord(level: string, message: any, context?: string, trace?: string) {
      const embed = {
         color: this.getColorForLevel(level),
         title: `[${level}] ${context ? `[${context}]` : ''}`,
         description: typeof message === 'object' ? JSON.stringify(message, null, 2) : message,
         timestamp: new Date(),
         footer: {
            text: `Environment: ${this.configService.get<string>('LOG_ENV')}`,
         },
         field: [],
      };

      if (trace) {
         embed.field = [{ name: 'Stack Trace', value: trace.substring(0, 1024) }];
      }

      this.discordLogger.sendMessage(embed);
   }

   private getColorForLevel(level: string): number {
      switch (level) {
         case 'ERROR':
            return 0xff0000;
         case 'WARN':
            return 0xffff00;
         case 'INFO':
            return 0x00ff00;
         case 'DEBUG':
            return 0x0000ff;
         case 'VERBOSE':
            return 0x808080;
         default:
            return 0xffffff;
      }
   }
}
