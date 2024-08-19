import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLogger } from 'src/loggers';
import { QueryFailedError } from 'typeorm';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  timestamp: string;
  path: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  @Inject() private readonly logger: CustomLogger;

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorResponse = this.createErrorResponse(exception, request);

    this.logError(errorResponse, exception);

    // Sending the response
    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private createErrorResponse(
    exception: unknown,
    request: Request,
  ): ErrorResponse {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let error: string | undefined;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const response = exception.getResponse();
      message = (response as any).message || exception.message;
      error = exception.name;
    } else if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = exception.message;
      error = 'QueryFailedError';
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }
    return {
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
  }
  private logError(errorResponse: ErrorResponse, exception: unknown): void {
    const { statusCode, error, message, path } = errorResponse;
    const logMessage = `[${statusCode}] ${error}: ${message} - ${path}`;

    if (exception instanceof Error) {
      if (statusCode >= 500) {
        this.logger.debug(logMessage, exception.stack);
      }
      this.logger.error(logMessage, exception.stack);
    } else {
      this.logger.error(logMessage);
    }
  }
}
