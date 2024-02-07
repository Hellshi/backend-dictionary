import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CursorPaginationDto {
  @ApiPropertyOptional()
  @IsString()
  cursor: string;

  @ApiPropertyOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => Number.parseInt(value))
  take?: number;
}
