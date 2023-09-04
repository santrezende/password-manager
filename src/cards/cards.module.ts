import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardsRepository } from './cards.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepository, UsersService, UsersRepository],
})
export class CardsModule {}
