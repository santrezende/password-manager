import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  private SALT = 10;
  constructor(private readonly prisma: PrismaService) {}

  create(userDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...userDto,
        password: bcrypt.hashSync(userDto.password, this.SALT),
      },
    });
  }

  getById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async delete(user: User) {
    await this.prisma.card.deleteMany({ where: { userId: user.id } });
    await this.prisma.credential.deleteMany({ where: { userId: user.id } });
    await this.prisma.note.deleteMany({ where: { userId: user.id } });
    return this.prisma.user.delete({ where: { id: user.id } });
  }
}
