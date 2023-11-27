import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNumberString, IsString } from 'class-validator';
import { UserDto } from 'src/domain/auth/dtos/user.dto';

export class DoctorProfileUpdate extends PartialType(UserDto) { }

export class DoctorSearchDto {
  @ApiProperty()
  @IsString()
  search: string;
}

export class ProfileInfoDto {
  @ApiProperty()
  @IsMongoId()
  id: string;
}

export class SaveDoctorDto {
  @ApiProperty()
  @IsMongoId()
  doctor_id: string;
}

export class GetNearDoctorsDto {
  @ApiProperty()
  @IsNumberString()
  long: string;

  @ApiProperty()
  @IsNumberString()
  lat: string;
}