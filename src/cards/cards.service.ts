/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import Cryptr from 'cryptr';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  private readonly cryptr: Cryptr;

  constructor(private readonly repository: CardsRepository) {
    const Cryptr = require('cryptr');
    this.cryptr = new Cryptr(process.env.CRYPTR);
  }

  async create(body: CreateCardDto, user: User) {
    const { id } = user;
    await this.findWithTitle(body, id);

    const { password, cvv } = body;
    body.password = this.cryptr.encrypt(password);
    body.cvv = this.cryptr.encrypt(cvv);

    return await this.repository.create(body, user);
  }

  async findAll(user: User) {
    return await this.repository.findAllFromUser(user);
  }

  async findOne(id: number, user: User) {
    const card = await this.validateCard(id, user);

    card.password = this.cryptr.decrypt(card.password);
    card.cvv = this.cryptr.decrypt(card.cvv);

    return card;
  }

  async remove(id: number, user: User) {
    this.validateCard(id, user);
    return await this.repository.remove(id, user);
  }

  async validateCard(id: number, user: User) {
    const card = await this.repository.findOne(id);
    if (!card) throw new NotFoundException();
    if (card.userId !== user.id) throw new ForbiddenException();
    return card;
  }

  async findWithTitle(body: CreateCardDto, userId: number) {
    const card = await this.repository.findWithTitle(body, userId);
    if (card) throw new ConflictException('Title is not available');
  }
}
