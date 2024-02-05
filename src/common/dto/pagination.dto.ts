import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  @Transform(({ value }) => Number.parseInt(value))
  page: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  @Transform(({ value }) => Number.parseInt(value))
  take: number;
}
