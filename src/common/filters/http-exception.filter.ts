import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLogger } from 'src/loggers';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  @Inject() private readonly logger: CustomLogger;

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    await this.logger.debug(`Error: ${exception.message}`, exception.stack);
   response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  } 
}
