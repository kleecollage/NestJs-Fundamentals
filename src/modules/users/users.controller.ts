import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/modules/users/dto/user-dto';
import { UsersService } from 'src/modules/users/users.service';
import { ParseDatePipe } from 'src/pipes/parse-date/parse-date.pipe';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({
    description: 'Create a new user',
  })
  @ApiBody({
    description: 'Crete a user through UserDto. Return true if insert is ok',
    type: UserDto,
    examples: {
      example1: {
        value: {
          id: 1,
          name: 'John Doe',
          email: 'j.doe@mail.com',
          birthDate: '1990-02-05',
        },
      },
    },
  })
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  @ApiQuery({
    name: 'start',
    required: false,
    type: Date,
    description:
      'If is provided, return all users with date birth greater than this query',
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: Date,
    description:
      'If is provided, return all users with date birth lower than this query',
  })
  @ApiOperation({
    description:
      'Return all users with birth date betweens start and end. If start and end are not proveded all users will be returned',
  })
  getUsers(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.userService.getUsers(start, end);
  }

  @Put()
  @ApiOperation({
    description:
      'If user ID exists, the user will be updated, otherwise, one new user will be created. Returns true if process is ok',
  })
  @ApiBody({
    description: 'Edit one user using UserDto',
    type: UserDto,
    examples: {
      example1: {
        value: {
          id: 1,
          name: 'Jane Smith',
          email: 'j.smith@mail.com',
          birthDate: '1995-02-05',
        },
      },
    },
  })
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }

  @Delete('/:idUser')
  @ApiParam({
    name: 'idUser',
    type: Number,
    description: 'User ID to delete',
  })
  @ApiOperation({
    description:
      'If userID exists the user is deleted. Returns true if user is remove successfully',
  })
  deleteUser(@Param('idUser') idUser: number) {
    return this.userService.deleteUser(idUser);
  }
}
