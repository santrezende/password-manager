import { Test, TestingModule } from '@nestjs/testing';
import { WiFiService } from './wi-fi.service';

describe('WiFiService', () => {
  let service: WiFiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WiFiService],
    }).compile();

    service = module.get<WiFiService>(WiFiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
