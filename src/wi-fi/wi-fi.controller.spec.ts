import { Test, TestingModule } from '@nestjs/testing';
import { WiFiController } from './wi-fi.controller';
import { WiFiService } from './wi-fi.service';

describe('WiFiController', () => {
  let controller: WiFiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WiFiController],
      providers: [WiFiService],
    }).compile();

    controller = module.get<WiFiController>(WiFiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
