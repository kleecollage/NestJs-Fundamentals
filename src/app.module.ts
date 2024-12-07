import { Module } from '@nestjs/common';
import { CronModule } from 'src/modules/cron/cron.module';

@Module({
  imports: [CronModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
