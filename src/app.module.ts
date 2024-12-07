import { Module } from '@nestjs/common';
import { CronModule } from 'src/modules/cron/cron.module';
import { LoggerModule } from 'src/modules/logger/logger.module';

@Module({
  imports: [CronModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
