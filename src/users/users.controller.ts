import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ConfirmPasswordDto } from './dto/confirm-password.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('erase')
  delete(@Body() body: ConfirmPasswordDto, @User() user: UserPrisma) {
    return this.usersService.delete(body, user);
  }
}
