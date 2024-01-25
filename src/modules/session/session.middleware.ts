import { JWTService } from '@/shared/infra/auth/jwt/jwt.service';
import { prisma } from '@/shared/infra/database/prisma';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JWTService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (token) {
      const decoded = this.jwtService.decodeToken(token.split(' ')[1]);

      if (decoded) {
        const user = await prisma.user.findFirst({
          where: { id: decoded.sub },
        });

        if (user) {
          req.user = user;

          return next();
        }
      }
    }

    throw new UnauthorizedException();
  }
}
