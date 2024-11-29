import { Module } from '@nestjs/common';
import { NamesModule } from 'src/modules/names/names.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [NamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
