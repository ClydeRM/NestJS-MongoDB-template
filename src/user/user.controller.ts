import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './Dto/user.dto'; // Request的物件屬性
import { User } from './interfaces/user.interface'; // Response的物件屬性

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('/:userId')
  async getUserById(@Param('userId') id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @Post('/new')
  async CreateUser(@Body() body: UserDto): Promise<User> {
    return this.userService.createOne(body);
  }

  @Patch('/update/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UserDto,
  ): Promise<User> {
    return this.userService.updateOne(userId, body);
  }

  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') id: string): Promise<{ deleted: boolean }> {
    return this.userService.deleteOne(id);
  }
}
