import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: any): Promise<any> {
    const userRegistered = this.userService.createUser(signupDto);
    return userRegistered;
  }

  async authenticateuser(
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    const authenticateuser = await this.userService.findUserByEmail(email);
    if (!authenticateuser) {
      throw new HttpException('User not found', 404);
    }
    if (authenticateuser.password !== password) {
      throw new HttpException('Invalid password', 401);
    }
    const payload = {
      userId: authenticateuser.id,
      email: authenticateuser.email,
      name: authenticateuser.name,
    };

    // Generate JWT token
    const token = jwt.sign({ ...payload }, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return { token };
  }
}
