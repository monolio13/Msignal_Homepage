import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
type LeadType = 'FREE_TRIAL' | 'CONSULT';

type AdminLeadItem = {
  type: LeadType;
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
  agreePersonal: boolean;
  agreeMarketing: boolean;

  // FreeTrial only
  ageRange?: string;
  investAmount?: string;

  // Consult only
  inquiryTypes?: string[];
};

type GetLeadsQuery = {
  type?: 'all' | 'free_trial' | 'consult';
  search?: string;
  page?: number;
  limit?: number;
};

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private sign(adminId: string, email: string) {
    return this.jwt.sign({
      sub: adminId,
      email,
      role: 'admin',
    });
  }

  async register(dto: AdminRegisterDto) {
    const email = dto.email.toLowerCase().trim();

    // ✅ Optional: lock admin register (professional)
    // Allow register if no admin exists OR setupKey matches env
    const adminCount = await this.prisma.admin.count();
    const setupKey = process.env.ADMIN_SETUP_KEY;

    if (adminCount > 0) {
      if (!setupKey) {
        throw new ForbiddenException(
          'Admin registration is disabled (no ADMIN_SETUP_KEY configured).',
        );
      }
      if (!dto.setupKey || dto.setupKey !== setupKey) {
        throw new ForbiddenException('Invalid setup key.');
      }
    }

    const exists = await this.prisma.admin.findUnique({
      where: { email },
      select: { id: true },
    });
    if (exists) throw new ConflictException('Admin already exists');

    if (!dto.password || dto.password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    const hash = await bcrypt.hash(dto.password, 12);

    const admin = await this.prisma.admin.create({
      data: { email, password: hash },
      select: { id: true, email: true, createdAt: true },
    });

    return {
      admin,
      access_token: this.sign(admin.id, admin.email),
    };
  }

  async login(dto: AdminLoginDto) {
    const email = dto.email.toLowerCase().trim();

    const admin = await this.prisma.admin.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, admin.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return {
      admin: { id: admin.id, email: admin.email },
      access_token: this.sign(admin.id, admin.email),
    };
  }

  async getLeads(query: GetLeadsQuery) {
    const type = query.type ?? 'all';
    const search = query.search?.trim();
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(200, Math.max(1, query.limit ?? 50));

    const searchFilter =
      search && search.length > 0
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { phone: { contains: search } },
            ],
          }
        : undefined;

    const needFreeTrial = type === 'all' || type === 'free_trial';
    const needConsult = type === 'all' || type === 'consult';

    const [freeTrials, consults] = await Promise.all([
      needFreeTrial
        ? this.prisma.user.findMany({
            where: searchFilter,
            select: {
              id: true,
              name: true,
              phone: true,
              ageRange: true,
              investAmount: true,
              agreePersonal: true,
              agreeMarketing: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 1000, // safety cap
          })
        : Promise.resolve([]),

      needConsult
        ? this.prisma.consultLead.findMany({
            where: searchFilter,
            select: {
              id: true,
              name: true,
              phone: true,
              inquiryTypes: true,
              agreePersonal: true,
              agreeMarketing: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 1000, // safety cap
          })
        : Promise.resolve([]),
    ]);

    const merged: AdminLeadItem[] = [
      ...freeTrials.map(
        (x): AdminLeadItem => ({
          type: 'FREE_TRIAL',
          id: x.id,
          name: x.name,
          phone: x.phone,
          createdAt: x.createdAt,
          agreePersonal: x.agreePersonal,
          agreeMarketing: x.agreeMarketing,
          ageRange: x.ageRange,
          investAmount: x.investAmount,
        }),
      ),
      ...consults.map(
        (x): AdminLeadItem => ({
          type: 'CONSULT',
          id: x.id,
          name: x.name,
          phone: x.phone,
          createdAt: x.createdAt,
          agreePersonal: x.agreePersonal,
          agreeMarketing: x.agreeMarketing,
          inquiryTypes: x.inquiryTypes,
        }),
      ),
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const total = merged.length;
    const start = (page - 1) * limit;
    const items = merged.slice(start, start + limit);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
