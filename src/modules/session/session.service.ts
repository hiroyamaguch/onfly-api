import { JWTService } from '@/shared/infra/auth/jwt/jwt.service';
import { prisma } from '@/shared/infra/database/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RefreshTokenDTO } from './dtos';
import { User } from '@prisma/client';

@Injectable()
export class SessionService {
  constructor(readonly jwtService: JWTService) {}

  private async generateSessionData(user: User): Promise<RefreshTokenDTO> {
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const access_token = this.jwtService.generateToken({
      username: user.name,
      sub: user.id,
    });

    const refresh_token = this.jwtService.generateToken(
      {
        username: user.name,
        sub: user.id,
      },
      '2h',
    );

    return { access_token, refresh_token };
  }

  async create(name: string, password: string): Promise<RefreshTokenDTO> {
    const user = await prisma.user.findFirst({
      where: { name, password },
    });

    const sessionData = this.generateSessionData(user);

    return sessionData;
  }

  async refresh(token: string): Promise<RefreshTokenDTO> {
    const decoded = this.jwtService.decodeToken(token);

    const user = await prisma.user.findFirst({
      where: { id: decoded.sub },
    });

    const sessionData = this.generateSessionData(user);

    return sessionData;
  }
}
