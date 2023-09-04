import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(body: CreateCardDto, user: User) {
    return this.prisma.card.create({
      data: {
        ...body,
        userId: user.id,
      },
    });
  }

  findAllFromUser(user: User) {
    return this.prisma.card.findMany({ where: { userId: user.id } });
  }

  findOne(id: number) {
    return this.prisma.card.findFirst({ where: { id } });
  }

  remove(id: number, user: User) {
    return this.prisma.card.delete({ where: { id, userId: user.id } });
  }

  findWithTitle(body: CreateCardDto, userId: number) {
    return this.prisma.card.findFirst({
      where: { title: body.title, userId },
    });
  }
}
