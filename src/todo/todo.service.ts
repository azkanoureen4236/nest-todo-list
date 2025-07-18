import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Todo } from '@prisma/client';
import { TodoDto } from './dto/todo.dto';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService,
              private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  async createTodo(data: {
    title: string;
    description?: string;
    userId: number;
  }): Promise<Todo> {
    try{ 
    const todo = await this.prisma.todo.create({
      data,
    });
    return todo;
  }catch (error) {
       throw new InternalServerErrorException('Failed to fetch todos');
    }
  
  }

  async getTodos(userId: number): Promise<Todo[]> {
    try{
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }catch (error) {
      throw new InternalServerErrorException('Failed to fetch todos');
    }
  }

async updateTodo(
    todoId: number,
    userId: number,
    data: Partial<TodoDto>,
  ): Promise<Todo> {
    try{
    return this.prisma.todo.update({
      where: { id: todoId },
      data,
    });
  } catch (error) {
      throw new InternalServerErrorException('Failed to update todo');
    }
  }

  async deleteTodo(todoId: number, userId: number): Promise<Todo> {
    try{ 
    return this.prisma.todo.delete({
      where: { id: todoId },
    });
  } catch (error) {
      throw new InternalServerErrorException('Failed to delete todo');
    }
  }

  async getTodoById(todoId: number, userId: number): Promise<Todo | null> {
    try{
    return this.prisma.todo.findFirst({
      where: { id: todoId, userId },
    });
  }catch (error) {
      throw new InternalServerErrorException('Failed to fetch todo by ID'); 
  }

}
}


