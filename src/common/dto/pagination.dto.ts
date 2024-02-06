import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationDto {
  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  @Transform(({ value }) => Number.parseInt(value))
  page: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  @Transform(({ value }) => Number.parseInt(value))
  take: number;
}
