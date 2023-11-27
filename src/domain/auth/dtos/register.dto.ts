import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Gender } from 'src/enums/gender.enum';
import { Role } from 'src/enums/role.enum';

export class SignUpDto {
  @ApiProperty()
  @Matches(/^998[389][012345789][0-9]{7}$/)
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  otp: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}

export class RegisterPhoneDto {
  @ApiProperty()
  @Matches(/^998[389][012345789][0-9]{7}$/)
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  message_key: string
}

export class AdminRegisterPhoneDto extends RegisterPhoneDto {
  @ApiProperty()
  @IsString()
  first_name: string;
}

export class LoginDto extends RegisterPhoneDto {
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}

export class ClientInfoDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  second_name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  middle_name: string;

  @ApiProperty()
  @IsDateString()
  birth_date?: Date;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  image_id: string;
}
