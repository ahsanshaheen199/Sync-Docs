import { Service } from 'typedi';
import { User } from '../database/entities/user.entity';
import jwt from 'jsonwebtoken';
import { appConfig } from '../config/app.config';

@Service()
export class JwtService {
	async generateJwtToken(user: User): Promise<string> {
		return jwt.sign({ id: user.id }, appConfig.JWT_SECRET, {
			expiresIn: '7d',
		});
	}
}
