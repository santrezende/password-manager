import { HttpCode, HttpStatus } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customPassword', async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return passwordRegex.test(password);
  }
  @HttpCode(HttpStatus.BAD_REQUEST)
  defaultMessage() {
    return 'A senha deve conter pelo menos 10 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial.';
  }
}
