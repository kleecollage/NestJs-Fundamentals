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
import { NamesService } from 'src/modules/names/names.service';

@Controller('api/v1/names')
@ApiTags('names')
export class NamesController {
  constructor(private nameService: NamesService) {}

  @Post()
  @ApiBody({
    description: 'Adding a new name',
    examples: {
      example1: {
        value: {
          name: 'John',
        },
      },
      example2: {
        value: {
          name: 'Emilly',
        },
      },
    },
  })
  @ApiOperation({
    description: 'Create a new name. Return true if post is successfully',
  })
  createName(@Body() data: { name: string }) {
    return this.nameService.createName(data.name);
  }

  @Get()
  @ApiQuery({
    name: 'start',
    type: 'string',
    required: false,
    description: 'Names whose beginning matches the query',
  })
  @ApiOperation({
    description: 'Return all the names inserted',
  })
  getNames(@Query('start') start: string) {
    return this.nameService.getNames(start);
  }

  @Put('/:name/:newName')
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'Original name',
  })
  @ApiParam({
    name: 'newName',
    type: 'string',
    description: 'New name',
  })
  @ApiOperation({
    description:
      'Replace the name on parameter 1 with the name on prameter 2. Return true if the update is successfully',
  })
  updateName(@Param('name') name: string, @Param('newName') newName: string) {
    return this.nameService.updateName(name, newName);
  }

  // This delete/clear must be reading first //
  @Delete('clear')
  @ApiOperation({
    description: 'Delete all the names saved',
  })
  clearNames() {
    return this.nameService.clearNames();
  }

  @Delete('/:name')
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'Name to delete',
  })
  @ApiOperation({
    description:
      'Removes a name passed by parameter. Return true if delete is successfully',
  })
  deleteName(@Param('name') name: string) {
    return this.nameService.deleteName(name);
  }
}
