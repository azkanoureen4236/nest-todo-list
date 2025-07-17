import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { IsEmailAlreadyExists } from "src/validators/is-email-already-exists.validator";

export class UserDto {
  @IsNotEmpty({ message: 'ID is required' })
  id: number;
  @IsEmail({}, { message: 'Invalid email format' })
  @IsEmailAlreadyExists({ message: 'Email already exists' })
     email: string;
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;
  @IsNotEmpty({ message: 'Password is required' })
      @MinLength(6, { message: 'Password must be at least 6 characters' })
      @Matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, {
        message: 'Password must include at least one special character',
      })
  password: string;
  @IsNotEmpty({ message: 'Role is required' })
  role: string;
  static email: any;
}
