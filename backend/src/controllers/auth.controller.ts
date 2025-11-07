import {
	Body,
	Controller,
	Post,
	Req,
	Res,
	UseBefore,
} from 'routing-controllers';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Request, Response } from 'express';
import { Service } from 'typedi';
import { UserService } from '../services/user.service';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { JwtService } from '../services/jwt-service';
import { LoginDto } from '../dtos/login.dto';

@Controller('/auth')
@Service()
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	@Post('/register')
	@UseBefore(validationMiddleware(CreateUserDto))
	async register(@Req() req: Request, @Res() res: Response) {
		const user = await this.userService.createUser(req.body);
		const token = await this.jwtService.generateJwtToken(user);
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
		});
		return res.json({
			message: 'User registered successfully',
			data: {
				user,
			},
		});
	}

	@Post('/login')
	@UseBefore(validationMiddleware(LoginDto))
	async login(@Body() body: LoginDto, @Res() res: Response) {
		const user = await this.userService.login(body);
		const token = await this.jwtService.generateJwtToken(user);
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
		});
		return res.json({
			message: 'Logged in successfully',
			data: {
				user,
			},
		});
	}

	@Post('/logout')
	async logout(@Req() req: Request, @Res() res: Response) {
		res.clearCookie('token');
		return res.json({
			message: 'Logged out successfully',
		});
	}
}
