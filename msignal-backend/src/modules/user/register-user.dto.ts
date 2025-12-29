import { IsBoolean, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ArrayMinSize, IsArray } from 'class-validator';
export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  // simple KR phone-like validation (adjust if you want)
  @Matches(/^[0-9\-+\s]{8,20}$/, { message: 'Invalid phone format' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  ageRange: string; // ex: "20대", "30대", "60이상"

  @IsString()
  @IsNotEmpty()
  investAmount: string; // ex: "100만원", "500만원", etc

  @IsBoolean()
  agreePersonal: boolean;

  @IsBoolean()
  agreeMarketing: boolean;
}

export class CreateConsultLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9\-+\s]{8,20}$/, { message: 'Invalid phone format' })
  phone: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Select at least 1 inquiry type' })
  @IsString({ each: true })
  inquiryTypes: string[];

  @IsBoolean()
  agreePersonal: boolean;

  @IsBoolean()
  agreeMarketing: boolean;
}
