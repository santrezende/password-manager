import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}
