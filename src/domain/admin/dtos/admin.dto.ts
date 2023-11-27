import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { DoctorStatus, Role } from 'src/enums/role.enum';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class AddAdminDto {
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}

export class ApplicationAcceptOrRejectDto {
  @ApiProperty({ enum: DoctorStatus })
  @IsEnum(DoctorStatus)
  doctor_status: DoctorStatus;
}

export class DeleteOrUpdateOneElement {
  @ApiProperty()
  @IsMongoId()
  id: string;
}

export class SearchListDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;
}
