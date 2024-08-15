import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apps/auth/auth.module';
import { LoggerMiddleware } from './middlewares';
import { PostgresDbModule } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PostgresDbModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
