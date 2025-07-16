import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { TodoDto } from './dto/todo.dto';

@UseGuards(AuthGuard('jwt')) 
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  createTodo(@Req() req, @Body() body: TodoDto) {
    
    return this.todoService.createTodo({
      title: body.title,
      description: body.description,
      userId: req.user.userId,
    });
  }

  @Get()
  getTodos(@Req() req) {
    return this.todoService.getTodos(req.user.userId);
  }

  @Get(':id')
  async getTodoById(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const todo = await this.todoService.getTodoById(id, req.user.userId);
    if (!todo) {
      throw new HttpException(`Todo with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  @Patch(':id')
  async updateTodoById(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<TodoDto>
  ) {
    const updated = await this.todoService.updateTodo(id, req.user.userId, body);
    if (!updated) {
      throw new HttpException(`Todo with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return updated;
  }

  @Delete(':id')
  async deleteTodoById(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const deleted = await this.todoService.deleteTodo(id, req.user.userId);
    if (!deleted) {
      throw new HttpException(`Todo with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return { message: `Todo with ID ${id} deleted successfully` };
  }
}
