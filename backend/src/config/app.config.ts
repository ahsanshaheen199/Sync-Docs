import { getEnv } from '../utlis/get-env';

export const appConfig = {
	PORT: getEnv('PORT', '8000'),
	NODE_ENV: getEnv('NODE_ENV', 'development'),
	JWT_SECRET: getEnv('JWT_SECRET'),
	DB_HOST: getEnv('DB_HOST', 'localhost'),
	DB_USERNAME: getEnv('DB_USERNAME'),
	DB_PASSWORD: getEnv('DB_PASSWORD'),
	DB_NAME: getEnv('DB_NAME'),
	DB_PORT: getEnv('DB_PORT'),
	FRONTEND_URL: getEnv('FRONTEND_URL'),
};
