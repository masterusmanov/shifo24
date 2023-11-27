import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class SetViewDto {
  @ApiProperty()
  @IsMongoId()
  doctor_id: string;
}