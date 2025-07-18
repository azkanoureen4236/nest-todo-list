import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    if (!signupDto) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.authService.signup(signupDto);


  }

  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Body() loginDto: LoginDto) {
    if (!loginDto || !loginDto.email || !loginDto.password) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    if (!req.user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(req.user);
  }
}
