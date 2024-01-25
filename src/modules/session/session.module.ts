import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { JWTModule } from '@/shared/infra/auth/jwt/jwt.module';

@Module({
  controllers: [SessionController],
  exports: [SessionService],
  imports: [JWTModule],
  providers: [SessionService],
})
export class SessionModule {}
