import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger: Logger = new Logger();

  public override catch(exception: unknown, host: ArgumentsHost): void {
    let args: unknown;
    super.catch(exception, host);
    const status = this.getHttpStatus(exception);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (exception instanceof Error) {
        this.logger.error({ err: exception, args });
      } else {
        this.logger.error('UnhandledException', exception);
      }
    } else if (exception instanceof NotFoundException) {
      this.logger.warn(`Not Found: ${exception.message}`);
    } else if (status === HttpStatus.FORBIDDEN) {
      if (exception instanceof Error) {
        this.logger.error({ err: exception, args });
      } else {
        this.logger.error('ForbiddenException', exception);
      }
    }
  }

  private getHttpStatus(exception: unknown): HttpStatus {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
