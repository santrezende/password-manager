import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { CustomPasswordValidator } from './custom-password.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Validate(CustomPasswordValidator)
  password: string;
}
