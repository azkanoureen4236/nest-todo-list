import { Module } from '@nestjs/common';
import { AuthController } from './auth.cotroller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import * as dotenv from 'dotenv';
import { IsEmailAlreadyExistsConstraint } from 'src/validators/is-email-already-exists.validator';
import { PrismaService } from 'prisma/prisma.service';
dotenv.config();


@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService, JwtStrategy,LocalStrategy,IsEmailAlreadyExistsConstraint,PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
