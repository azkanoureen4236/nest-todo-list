import { IsNotEmpty, IsString } from "class-validator";

export class TodoDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  @IsString({message: 'description will be on string'})
  description?: string;
}
