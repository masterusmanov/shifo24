import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional, IsNumber } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsMongoId()
  room: string;

  @ApiProperty()
  @IsString()
  message: string;
}

export class GetMessagesDto {
  // @IsMongoId()
  room: string;

  @ApiProperty({
    description: 'Count of data that should be sent for one page',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
