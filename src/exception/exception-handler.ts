import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus as NestHttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpStatus } from 'src/enums/http-status.enum';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const httpAdapter = this.httpAdapterHost;

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : NestHttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      httpStatus >= HttpStatus.ServerError ? HttpStatus.ServerError : exception;

    const responseBody = {
      statusCode: httpStatus,
      message: message['response']?.message || message,
      path: httpAdapter.getRequestUrl(context.getRequest()),
      method: request.method,
      timestamp: new Date().toISOString(),
    };

    if (httpStatus >= HttpStatus.ServerError) {
      if (process.env.NODE_ENV === 'production') {
        httpAdapter.reply(response, responseBody, httpStatus);

        // Sentry.captureException(exception);
      } else {
        console.log(exception);

        responseBody.message = exception.toString();

        httpAdapter.reply(response, responseBody, httpStatus);
      }
    } else {
      httpAdapter.reply(response, responseBody, httpStatus);
    }
  }
}
