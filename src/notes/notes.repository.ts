import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(body: CreateNoteDto, user: User) {
    return this.prisma.note.create({
      data: {
        ...body,
        userId: user.id,
      },
    });
  }

  findAll(user: User) {
    return this.prisma.note.findMany({ where: { userId: user.id } });
  }

  findOne(id: number) {
    return this.prisma.note.findFirst({ where: { id } });
  }

  remove(id: number, user: User) {
    return this.prisma.note.delete({ where: { id, userId: user.id } });
  }

  findWithTitle(body: CreateNoteDto, userId: number) {
    return this.prisma.note.findFirst({
      where: { title: body.title, userId },
    });
  }
}
