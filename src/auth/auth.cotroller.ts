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
import { SignupDto } from './dto/user-signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Req() req, @Body() loginDto: LoginDto) {
    return this.authService.authenticateuser(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async Login(@Req() req) {
    if (!req.user) {
      throw new HttpException(
        'user was not appended by the guard',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.userService.getUserById(req.user.userId);
  }
}
