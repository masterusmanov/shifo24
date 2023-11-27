import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { DeleteOrUpdateOneElement } from './admin.dto';

export class IconDto {
  @ApiProperty()
  @IsUrl()
  icon_m_url: string;

  @ApiProperty()
  @IsUrl()
  icon_s_url: string;
}

export class DeleteIconDto extends DeleteOrUpdateOneElement {}
