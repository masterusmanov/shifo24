import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Language } from 'src/enums/langugage.enum';
import { LanguageObject } from 'src/shared/dto/language-object.dto';

export class CreateSpecDto {
  @ApiProperty()
  @IsString()
  uz: string;

  @ApiProperty()
  @IsString()
  ru: string;

  @ApiProperty()
  @IsString()
  en: string;
}

export class GetSpecDto {
  @ApiProperty()
  @IsEnum(Language)
  lang: Language;
}

export class SpecializationDto {
  @ApiProperty({ type: LanguageObject })
  @Type(() => LanguageObject)
  @ValidateNested()
  name: LanguageObject;

  @ApiProperty()
  @IsUrl()
  icon_url: string;
}

export class UpdateSpecDto extends PartialType(SpecializationDto) {}
