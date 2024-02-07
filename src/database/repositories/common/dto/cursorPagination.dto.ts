import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CursorPaginationDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cursor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => Math.abs(Number.parseInt(value)))
  @Min(1, { message: 'Take value should be greater than 0' })
  take?: number;
}
