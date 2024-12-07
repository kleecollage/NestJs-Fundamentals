import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CronService } from 'src/modules/cron/cron.service';

@Controller('api/v1/cron')
export class CronController {
  constructor(private cronService: CronService) {}
  //** ------------------------------ GET ALL CRON NAMES ------------------------------ **//
  @Get()
  @ApiOperation({
    description: 'Obains the name of all crons',
  })
  @ApiResponse({
    status: 200,
    description: 'Names returned successfully',
  })
  getNamesCrons() {
    return this.cronService.getNamesCrons();
  }
  //** ------------------------------ DESACTIVATE CRONE ------------------------------ **//
  @Put('/desactivate/:name')
  @ApiOperation({
    description: 'Deactivates one cron',
  })
  @ApiParam({
    name: 'name',
    type: String,
    required: true,
    description: 'Cron name to deactivate',
  })
  @ApiResponse({
    status: 200,
    description: 'Cron deactivated correctly',
  })
  @ApiResponse({
    status: 409,
    description: 'Cron not exists',
  })
  desactivateCron(@Param('name') name: string) {
    return this.cronService.desactivateCron(name);
  }
  //** ------------------------------ ACTIVATE CRONE ------------------------------ **//
  @Put('/activate/:name')
  @ApiOperation({
    description: 'Activate one cron',
  })
  @ApiParam({
    name: 'name',
    type: String,
    required: true,
    description: 'Cron name to activate',
  })
  @ApiResponse({
    status: 200,
    description: 'Cron activated correctly',
  })
  @ApiResponse({
    status: 409,
    description: 'Cron not exists',
  })
  activateCron(@Param('name') name: string) {
    return this.cronService.activateCron(name);
  }
  //** ------------------------------ DESACTIVATE ALL CRONE ------------------------------ **//
  @Put('/desactivate-all')
  @ApiOperation({
    description: 'Desactivate all active crons',
  })
  @ApiResponse({
    status: 200,
    description: 'Crons disabled correctly',
  })
  desactivateAllCrons() {
    return this.cronService.desactivateAllCrons();
  }
  //** ------------------------------ ACTIVATE ALL CRONE ------------------------------ **//
  @Put('/activate-all')
  @ApiOperation({
    description: 'Activate all disabled crons',
  })
  @ApiResponse({
    status: 200,
    description: 'Crons disabled correctly',
  })
  activateAllCrons() {
    return this.cronService.activateAllCrons();
  }
}
