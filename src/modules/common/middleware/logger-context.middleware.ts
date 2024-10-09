import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {}

  public use(req: Request | any, _res: Response, next: () => void): void {
    req.customProps = {};
    //TODO: Add extra fields to share in logger context
    this.logger.assign(req.customProps);

    next();
  }
}
