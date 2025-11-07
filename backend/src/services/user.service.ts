import { appDataSource } from '../config/database.config';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { LoginDto } from '@/dtos/login.dto';
import bcrypt from 'bcrypt';

@Service()
export class UserService {
	private userRepository: Repository<User>;
	constructor() {
		this.userRepository = appDataSource.getRepository(User);
	}

	async createUser(user: CreateUserDto): Promise<User> {
		const existingUser = await this.userRepository.findOne({
			where: { email: user.email },
		});

		if (existingUser) {
			throw new HttpError(400, 'User already exists');
		}

		const newUser = this.userRepository.create({
			...user,
		});

		return this.userRepository.save(newUser);
	}

	async login(data: LoginDto): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { email: data.email },
		});

		if (!user) {
			throw new HttpError(400, 'Invalid email or password');
		}

		const isPasswordValid = await bcrypt.compare(
			data.password,
			user.password
		);

		if (!isPasswordValid) {
			throw new HttpError(400, 'Invalid email or password');
		}

		return user;
	}
}
