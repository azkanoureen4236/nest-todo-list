import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
dotenv.config();
@Injectable()
export class AuthService {
  createTodo(body: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly userService: UserService,
    //private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const userRegistered = this.userService.createUser(signupDto);
    return userRegistered;
  }

  async login(user: any): Promise<{ token: string }> {
    // add try catch block for all te functions in service files
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

      // Generate JWT token
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
