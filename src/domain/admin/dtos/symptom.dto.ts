import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsUrl } from 'class-validator';
import { LanguageObject } from 'src/shared/dto/language-object.dto';

export class SymptomDto {
  @ApiProperty({ type: LanguageObject })
  name: LanguageObject;

  @ApiProperty()
  @IsMongoId()
  spec: string;

  @ApiProperty()
  @IsUrl()
  icon_url: string;
}

export class UpdateSymptomDto extends PartialType(SymptomDto){}
