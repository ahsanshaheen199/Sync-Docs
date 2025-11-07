import { Middleware, NotFoundError } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class NotFoundMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		next(new NotFoundError('Page Not Found!'));
	}
}
