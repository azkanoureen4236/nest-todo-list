import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignupDto } from 'src/auth/dto/user-signup.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(signupDto: SignupDto): Promise<any> {
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
  }

  async findUserByEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async getUserById(userId: number): Promise<any> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
  async updateUser(userDto: UserDto): Promise<any> {
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
  }
}
