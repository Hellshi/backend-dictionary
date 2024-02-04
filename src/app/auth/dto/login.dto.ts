import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'admin@admin.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'Password@123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
