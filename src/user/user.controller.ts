import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me/:id')
  getUser(@Req() req: any, @Param('id') id: string) {
    const userId = parseInt(id, 10);
    console.log('typeee', typeof userId);
    return this.userService.getUserById(userId);
  }
  @Patch('update')
  updateUser(@Req() req: any, @Body() updateData: any) {
    const user = req.user;
    return this.userService.updateUser(updateData);
  }
}
