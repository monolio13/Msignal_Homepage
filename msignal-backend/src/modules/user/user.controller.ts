import { Body, Controller, Post } from '@nestjs/common';
import { CreateConsultLeadDto, RegisterUserDto } from './register-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.user.register(dto);
  }

  @Post('consult')
  createConsult(@Body() dto: CreateConsultLeadDto) {
    return this.user.createConsult(dto);
  }
}
