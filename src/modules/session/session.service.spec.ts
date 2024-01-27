import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './session.service';
import { JWTModule } from '@/shared/infra/auth/jwt/jwt.module';
import { NotFoundException } from '@nestjs/common';

describe('Session Service', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JWTModule],
      providers: [SessionService],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should create session with correct data', async () => {
    await expect(service.create('Pedro', '1234')).resolves.toBeDefined();
  });

  it('should not create session with wrong data', async () => {
    await expect(service.create('Pedro', '12')).rejects.toThrow(
      NotFoundException,
    );
  });
});
