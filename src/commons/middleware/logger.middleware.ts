import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Origin:", req.headers.host, "Resource:", req.originalUrl, "Method:", req.method.toUpperCase());
    next();
  }
}
