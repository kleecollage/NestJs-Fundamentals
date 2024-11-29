import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NamesService } from 'src/modules/names/names.service';

@Controller('api/v1/names')
export class NamesController {
  constructor(private nameService: NamesService) {}

  @Post()
  createName(@Body() data: { name: string }) {
    return this.nameService.createName(data.name);
  }

  @Get()
  getNames(@Query('start') start: string) {
    return this.nameService.getNames(start);
  }

  @Put('/:name/:newName')
  updateName(@Param('name') name: string, @Param('newName') newName: string) {
    return this.nameService.updateName(name, newName);
  }
}
