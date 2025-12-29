import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminJwtGuard } from './guard/admin-jwt.guard';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly service: AdminAuthService) {}

  @Post('register')
  register(@Body() dto: AdminRegisterDto) {
    return this.service.register(dto);
  }

  @Post('login')
  login(@Body() dto: AdminLoginDto) {
    return this.service.login(dto);
  }

  // ✅ admin panel uses this to validate token on load
  @UseGuards(AdminJwtGuard)
  @Get('me')
  me(@Req() req: any) {
    return { user: req.user };
  }

  @UseGuards(AdminJwtGuard)
  @Get('leads')
  getLeads(
    @Query('type') type?: 'all' | 'free_trial' | 'consult',
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.service.getLeads({
      type: type ?? 'all',
      search,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 50,
    });
  }
}
