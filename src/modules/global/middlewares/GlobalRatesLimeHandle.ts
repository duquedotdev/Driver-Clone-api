import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { RateLimiterMemory } from 'rate-limiter-flexible';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { HttpStatusError, HttpStatus } from '@shared/errors';

import { BLOCK_DURATION_IN_MINUTES, INTERVAL_IN_SECONDS, MAXIMUM_ATTEMPTS } from '@config/env';

@Service()
@Middleware({ type: 'before' })
export class GlobalRateLimit implements ExpressMiddlewareInterface {
  private static limiter = new RateLimiterMemory({
    points: Number(MAXIMUM_ATTEMPTS) ?? 5,
    duration: Number(INTERVAL_IN_SECONDS) ?? 5,
    blockDuration: Number(BLOCK_DURATION_IN_MINUTES) ?? 10 * 60,
  });

  async use(request: Request, _: Response, next: NextFunction): Promise<void> {
    try {
      await GlobalRateLimit.limiter.consume(request.ip);

      return next();
    } catch {
      throw new HttpStatusError(HttpStatus.TOO_MANY_REQUESTS, 'Bloqueado por excesso de requisições.');
    }
  }
}
