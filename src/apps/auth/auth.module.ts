import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerModule } from 'src/loggers';

@Module({
  imports: [ConfigModule.forRoot(), CustomLoggerModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
