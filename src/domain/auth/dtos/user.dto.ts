import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsArray,
  IsMongoId,
  IsInt,
} from 'class-validator';
import { Gender } from 'src/enums/gender.enum';
import { Role } from 'src/enums/role.enum';
import { University, Location, JobTime } from '../schemas/user.schema';

export class UserDto {
  @ApiProperty()
  @IsString()
  contact_phone: string;

  @Exclude()
  registered: boolean;

  @IsOptional()
  @IsString()
  @Exclude()
  otp: string;

  @IsOptional()
  @IsString()
  @Exclude()
  otp_date: Date;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  second_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  middle_name: string;

  @Exclude()
  role: Role;

  @ApiProperty({ type: Array<string> })
  @IsArray()
  @IsMongoId({ each: true })
  spec: Array<string>;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsDateString({})
  birth_date: Date;

  @ApiProperty()
  @IsDateString()
  job_date: Date;

  @ApiProperty({
    type: JobTime,
  })
  job_time: JobTime;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  certificate_url: Array<string>;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  languages: Array<string>;

  @ApiProperty({ type: [University] })
  @IsArray()
  university: Array<University>;

  @ApiProperty()
  @IsString()
  @Prop({ type: String })
  image_id: string;

  @ApiProperty({ type: Location })
  location: Location;

  @ApiProperty()
  @IsString()
  @IsOptional()
  workplace: string;

  @ApiProperty()
  @IsString()
  about: string;

  @ApiProperty()
  @IsInt()
  price: number;
}
