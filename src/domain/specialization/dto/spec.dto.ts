import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/enums/gender.enum';
import { Language } from 'src/enums/langugage.enum';

class GetDoctorsDto {
  @ApiProperty({ enum: Gender, required: false })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ enum: Language, required: false })
  @IsEnum(Language)
  @IsOptional()
  language?: Language;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  rate_sort?: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  nearest_sort?: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  cheapest_sort?: string;

  @ApiProperty({ required: false })
  @IsLongitude()
  @IsOptional()
  long?: string;

  @ApiProperty({ required: false })
  @IsLatitude()
  @IsOptional()
  latt?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  limit: string;
}

export class GetSpecDoctorsDto extends GetDoctorsDto {
  @ApiProperty()
  @IsMongoId()
  spec_id: string;
}

export class GetSymptomDoctorsDto extends GetDoctorsDto {
  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  spec_ids: Array<string>;
}
