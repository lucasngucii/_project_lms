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
  async warn(message: any, context?: string) {
    context = context || this.context;
    this.winstonLogger.log('warn', message, { context });
    await this.sendToDiscord('WARN', message, context);
  }

  async debug(message: any, context?: string) {
    context = context || this.context;
    this.winstonLogger.log('debug', message, { context });
    await this.sendToDiscord('DEBUG', message, context);
  }

  async verbose(message: any, context?: string) {
    context = context || this.context;
    this.winstonLogger.log('verbose', message, { context });
    await this.sendToDiscord('VERBOSE', message, context);
  }

  private async sendToDiscord(
    level: string,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const embed = {
      color: this.getColorForLevel(level),
      title: `${level} - ${message}`,
      description:
        typeof context === 'object'
          ? JSON.stringify(context, null, 2)
          : context,
      timestamp: new Date(),
      footer: {
        text: `Environment: ${this.configService.get<string>('LOG_ENV')}`,
      },
      field: [],
    };

    if (trace) {
      embed.field = [{ name: 'Stack Trace', value: trace.substring(0, 1024) }];
    }

    await this.discordLogger.sendMessage(embed);
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
