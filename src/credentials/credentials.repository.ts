/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsRepository {
  private readonly cryptr: Cryptr;

  constructor(private readonly prisma: PrismaService) {
    const Cryptr = require('cryptr');
    this.cryptr = new Cryptr(process.env.CRYPTR);
  }

  async create(user: User, createCredentialDto: CreateCredentialDto) {
    return await this.prisma.credential.create({
      data: {
        title: createCredentialDto.title,
        url: createCredentialDto.url,
        username: createCredentialDto.username,
        password: this.cryptr.encrypt(createCredentialDto.password),
        userId: user.id,
      },
    });
  }

  async findTitle(title: string) {
    return await this.prisma.credential.findFirst({
      where: {
        title,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.credential.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.credential.findFirst({
      where: { id },
    });

    if (result) {
      result.password = this.cryptr.decrypt(result.password);
    }

    return result;
  }

  async remove(id: number) {
    return await this.prisma.credential.delete({
      where: { id },
    });
  }
}
