import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LanguageObject {
  @ApiProperty()
  @IsString()
  ru: string;

  @ApiProperty()
  @IsString()
  uz: string;

  @ApiProperty()
  @IsString()
  eng: string;
}
