import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() user: UserPrisma,
  ) {
    return this.credentialsService.create(user, createCredentialDto);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    return this.credentialsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.credentialsService.findOne(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.credentialsService.remove(+id, user);
  }
}
