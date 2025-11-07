import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response } from 'express';
import { appConfig } from './config/app.config';
import { initializeDataSource } from './database/data-source';
import './config/passport.config';
import passport from 'passport';
import { useContainer, useExpressServer } from 'routing-controllers';
import path from 'path';
import Container from 'typedi';
import cookieParser from 'cookie-parser';
import { NotFoundMiddleware } from './middlewares/not-found.middleware';
import { HandleErrorMiddleware } from './middlewares/handle-error.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.get('/', (req: Request, res: Response) => {
	res.json({ message: 'Hello World' });
});

useContainer(Container);

useExpressServer(app, {
	routePrefix: '/api',
	defaultErrorHandler: false,
	controllers: [path.join(__dirname + '/controllers/*.controller.ts')],
	middlewares: [NotFoundMiddleware, HandleErrorMiddleware],
	cors: {
		origin: appConfig.FRONTEND_URL,
		credentials: true,
	},
});

app.listen(appConfig.PORT, async () => {
	await initializeDataSource();
	console.log(`Server is running on port ${appConfig.PORT}`);
});
