import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(signupDto: SignupDto): Promise<any> {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: signupDto.email,
          password: signupDto.password,
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
}
