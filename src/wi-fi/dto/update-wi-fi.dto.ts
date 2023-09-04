import { PartialType } from '@nestjs/mapped-types';
import { CreateWiFiDto } from './create-wi-fi.dto';

export class UpdateWiFiDto extends PartialType(CreateWiFiDto) {}
