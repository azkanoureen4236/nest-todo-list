import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [ScheduleModule.forRoot(),],
  controllers: [TodoController],
  providers: [TodoService,],
  exports: [],
})
export class TodoModule {}
