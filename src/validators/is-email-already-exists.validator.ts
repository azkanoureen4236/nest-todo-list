import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAlreadyExistsConstraint implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {
     
  }

  async validate(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
    
      where: { email },
    });
    return !user; 
  }

  defaultMessage(args: ValidationArguments): string {
    return `Email "${args.value}" is already in use`;
  }
}

export function IsEmailAlreadyExists(validationOptions?: ValidationOptions) {
   return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName:propertyName,
      options: validationOptions,
      validator: IsEmailAlreadyExistsConstraint,
    });
  };

}


