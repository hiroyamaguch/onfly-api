import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ExpensesModule } from '@/modules/expenses/expenses.module';
import { SessionModule } from './modules/session/session.module';
import { SessionMiddleware } from './modules/session/session.middleware';
import { JWTModule } from './shared/infra/auth/jwt/jwt.module';

@Module({
  imports: [ExpensesModule, SessionModule, JWTModule],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(SessionMiddleware)
      .forRoutes({ path: 'expenses', method: RequestMethod.ALL });
  }
}
