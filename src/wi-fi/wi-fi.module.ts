import { Module } from '@nestjs/common';
import { WiFiService } from './wi-fi.service';
import { WiFiController } from './wi-fi.controller';

@Module({
  controllers: [WiFiController],
  providers: [WiFiService],
})
export class WiFiModule {}
