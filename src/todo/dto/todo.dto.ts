import { IsNotEmpty } from "class-validator";

export class TodoDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  description?: string;
}
