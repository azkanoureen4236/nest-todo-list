import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(signupDto: SignupDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: signupDto.email,
          password: hashedPassword,
          name: signupDto.name,
        },
      });
      if (!user) {
        throw new HttpException('User creation failed', 500);
      }
      return user;
    } catch (error) {
      throw new HttpException('Failed to create user', 500);
    }
  }

  async findUserByEmail(email: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      throw new HttpException('Failed to fetch user by email', 500);
    }
  }

  async getUserById(userId: number): Promise<any> {
    try {
      return this.prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      throw new HttpException('Failed to fetch user by ID', 500);
    }
  }

  async updateUser(userDto: UserDto): Promise<any> {
    try {
      const user = await this.prisma.user.update({
        where: { email: userDto.email },
        data: {
          name: userDto.name,
          password: userDto.password,
        },
      });

      if (!user) {
        throw new HttpException('User update failed', 500);
      }

      return user;
    } catch (error) {
      throw new HttpException('Failed to update user', 500);
    }
  }
  async validateUserCredentials(loginDto: LoginDto): Promise<any> {
    const user = await this.findUserByEmail(loginDto.email);
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }

    const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials', 401);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}


