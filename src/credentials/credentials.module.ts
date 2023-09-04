import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [CredentialsController],
  providers: [
    CredentialsService,
    CredentialsRepository,
    UsersService,
    UsersRepository,
  ],
})
export class CredentialsModule {}
