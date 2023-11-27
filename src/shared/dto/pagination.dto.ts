import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  limit: string;
}
