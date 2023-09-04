import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CredentialsRepository } from './credentials.repository';
import { CreateCredentialDto } from './dto/create-credential.dto';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  async create(user: User, createCredentialDto: CreateCredentialDto) {
    const credential = await this.credentialsRepository.findTitle(
      createCredentialDto.title,
    );

    if (credential && credential.userId === user.id)
      throw new ConflictException('Title not available');

    return this.credentialsRepository.create(user, createCredentialDto);
  }

  async findAll(user: User) {
    return await this.credentialsRepository.findAll(user.id);
  }

  async findOne(id: number, user: User) {
    return this.validateCredential(id, user.id);
  }

  async remove(id: number, user: User) {
    this.validateCredential(id, user.id);
    return await this.credentialsRepository.remove(id);
  }

  async validateCredential(credentialId: number, userId: number) {
    const credential = await this.credentialsRepository.findOne(credentialId);
    if (!credential) throw new NotFoundException();
    if (credential.userId !== userId) throw new ForbiddenException();

    return credential;
  }
}
