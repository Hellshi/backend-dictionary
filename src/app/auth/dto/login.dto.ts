import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'default@user.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
