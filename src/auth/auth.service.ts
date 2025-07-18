import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { SignupDto } from './dto/signup.dto';
dotenv.config();
@Injectable()
export class AuthService {
  createTodo(body: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly userService: UserService,
    
  ) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const userRegistered = this.userService.createUser(signupDto);
    return userRegistered;
  }

  async login(user: any): Promise<{ token: string }> {
    
    try {
      const userdb = await this.userService.findUserByEmail(user.email);
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      if (user.password !== user.password) {
        throw new HttpException('Invalid password', 401);
      }
      const payload = {
        userId: user.id,
        email: user.email,
        password: user.password,
      };

     
      const token = jwt.sign({ ...payload }, process.env.JWT_SECRET || '', {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return { token };
    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException(error.message || 'Login failed');
    }
  }
}
