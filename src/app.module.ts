import { Module } from '@nestjs/common';
import { NamesModule } from 'src/modules/names/names.module';

@Module({
  imports: [NamesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
