import { Injectable } from '@nestjs/common';
import { CreateWiFiDto } from './dto/create-wi-fi.dto';
import { UpdateWiFiDto } from './dto/update-wi-fi.dto';

@Injectable()
export class WiFiService {
  create(createWiFiDto: CreateWiFiDto) {
    return 'This action adds a new wiFi';
  }

  findAll() {
    return `This action returns all wiFi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wiFi`;
  }

  update(id: number, updateWiFiDto: UpdateWiFiDto) {
    return `This action updates a #${id} wiFi`;
  }

  remove(id: number) {
    return `This action removes a #${id} wiFi`;
  }
}
