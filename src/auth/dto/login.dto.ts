import {IsEmail, 
        IsNotEmpty,
        IsString,
        Matches,
        MinLength } from 'class-validator';
export class LoginDto {

 @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must include at least one special character',
  })
  password: string;
  
}
