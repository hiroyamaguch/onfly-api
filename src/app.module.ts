import { Module } from '@nestjs/common';
import { ExpensesModule } from '@/modules/expenses/expenses.module';
import { SessionModule } from './modules/session/session.module';
import { JWTModule } from './shared/infra/auth/jwt/jwt.module';

@Module({
  imports: [ExpensesModule, SessionModule, JWTModule],
  providers: [],
})
export class AppModule {}
