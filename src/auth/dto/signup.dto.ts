import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { IsEmailAlreadyExists } from 'src/validators/is-email-already-exists.validator';
export class SignupDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsEmailAlreadyExists({ message: 'Email already exists' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must include at least one special character',
  })
  password: string;
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
