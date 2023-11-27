import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsString, Max, Min } from 'class-validator';

export class CommentDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsMongoId()
  doctor_id: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;
}

export class GetDoctorCommentsDto {
  @ApiProperty()
  @IsMongoId()
  doctor_id: string;
}