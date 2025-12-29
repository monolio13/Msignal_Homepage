import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class AdminRegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  // ✅ optional setup key (recommended)
  @IsOptional()
  @IsString()
  setupKey?: string;
}
