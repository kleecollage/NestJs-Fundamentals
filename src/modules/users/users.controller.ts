import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/modules/users/dto/user-dto';
import { UsersService } from 'src/modules/users/users.service';
import { ParseDatePipe } from 'src/pipes/parse-date/parse-date.pipe';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  getUsers(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.userService.getUsers(start, end);
  }
}
