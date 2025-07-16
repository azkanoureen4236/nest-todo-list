import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Todo } from '@prisma/client';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async createTodo(data: {
    title: string;
    description?: string;
    userId: number;
  }): Promise<Todo> {
    const todo = await this.prisma.todo.create({
      data,
    });
    return todo;
  }

  async getTodos(userId: number): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  //
  async updateTodo(
    todoId: number,
    userId: number,
    data: Partial<TodoDto>,
  ): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id: todoId },
      data,
    });
  }

  async deleteTodo(todoId: number, userId: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id: todoId },
    });
  }

  async getTodoById(todoId: number, userId: number): Promise<Todo | null> {
    return this.prisma.todo.findFirst({
      where: { id: todoId, userId },
    });
  }
}
