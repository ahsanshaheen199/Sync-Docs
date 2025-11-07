import {
	ExpressErrorMiddlewareInterface,
	HttpError,
	Middleware,
} from 'routing-controllers';
import { Service } from 'typedi';
import { Request, Response } from 'express';

@Service()
@Middleware({ type: 'after' })
export class HandleErrorMiddleware implements ExpressErrorMiddlewareInterface {
	error(error: Error, req: Request, res: Response) {
		if (res.headersSent) {
			return res;
		}
		if (error instanceof HttpError) {
			return res.status(error.httpCode).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Internal Server Error' });
	}
}
