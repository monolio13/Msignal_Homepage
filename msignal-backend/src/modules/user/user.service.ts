import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateConsultLeadDto, RegisterUserDto } from './register-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterUserDto) {
    if (!dto.agreePersonal) {
      throw new BadRequestException('agreePersonal is required');
    }

    // normalize phone (optional)
    const phone = dto.phone.replace(/\s/g, '');

    const exists = await this.prisma.user.findUnique({
      where: { phone },
      select: { id: true },
    });

    if (exists) {
      throw new BadRequestException('This phone is already registered');
    }

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        phone,
        ageRange: dto.ageRange,
        investAmount: dto.investAmount,
        agreePersonal: dto.agreePersonal,
        agreeMarketing: dto.agreeMarketing,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });

    return {
      user,
      message: 'User registered successfully',
    };
  }

  async createConsult(dto: CreateConsultLeadDto) {
    if (!dto.agreePersonal) {
      throw new BadRequestException('agreePersonal is required');
    }

    const phone = dto.phone.replace(/\s/g, '').trim();

    // Optional anti-spam: block duplicates within last X minutes
    // (simple professional protection)
    const recent = await this.prisma.consultLead.findFirst({
      where: {
        phone,
        createdAt: { gte: new Date(Date.now() - 1000 * 60 * 5) }, // 5 minutes
      },
      select: { id: true },
    });
    if (recent) {
      throw new BadRequestException(
        'Already submitted recently. Try again later.',
      );
    }

    const lead = await this.prisma.consultLead.create({
      data: {
        name: dto.name.trim(),
        phone,
        inquiryTypes: dto.inquiryTypes,
        agreePersonal: dto.agreePersonal,
        agreeMarketing: dto.agreeMarketing,
      },
      select: { id: true, name: true, phone: true, createdAt: true },
    });

    return { lead, message: 'Consult request submitted' };
  }
}
