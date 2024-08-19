import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerModule } from 'src/loggers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities';
import { AccountRepository } from 'src/repositories/account.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomLoggerModule,
    TypeOrmModule.forFeature([AccountEntity]),
  ],
  providers: [AuthService, AccountRepository],
  controllers: [AuthController],
})
export class AuthModule {}
