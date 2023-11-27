import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Language } from 'src/enums/langugage.enum';
import { State } from '../schemas/states.schema';

export class GetStatesDto {
  @ApiProperty()
  @IsEnum(Language)
  lang: Language;
}

export class UpdateStateDto extends PartialType(State){}