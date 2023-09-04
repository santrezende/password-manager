import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WiFiService } from './wi-fi.service';
import { CreateWiFiDto } from './dto/create-wi-fi.dto';
import { UpdateWiFiDto } from './dto/update-wi-fi.dto';

@Controller('wi-fi')
export class WiFiController {
  constructor(private readonly wiFiService: WiFiService) {}

  @Post()
  create(@Body() createWiFiDto: CreateWiFiDto) {
    return this.wiFiService.create(createWiFiDto);
  }

  @Get()
  findAll() {
    return this.wiFiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wiFiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWiFiDto: UpdateWiFiDto) {
    return this.wiFiService.update(+id, updateWiFiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wiFiService.remove(+id);
  }
}
