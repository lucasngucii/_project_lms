import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger } from './custom.log';
import { DiscordLogger } from './discord';
import { WinstonLogger } from './winston';

@Module({
   imports: [ConfigModule.forRoot()],
   providers: [CustomLogger, DiscordLogger, WinstonLogger],
   exports: [CustomLogger],
})
export class CustomLoggerModule {}
