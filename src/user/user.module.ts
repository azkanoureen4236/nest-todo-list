import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IsEmailAlreadyExistsConstraint } from 'src/validators/is-email-already-exists.validator';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService,IsEmailAlreadyExistsConstraint,PrismaService],
  exports: [UserService,IsEmailAlreadyExistsConstraint],
})
export class UserModule {}
