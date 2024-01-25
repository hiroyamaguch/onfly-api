import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface IGenerateToken {
  username: string;
  sub: string;
}

interface IDecodeToken {
  username: string;
  sub: string;
}

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: IGenerateToken, expiresIn = '1h'): string {
    return this.jwtService.sign(payload, { expiresIn });
  }

  decodeToken(token: string): IDecodeToken {
    return this.jwtService.decode(token) as IDecodeToken;
  }
}
