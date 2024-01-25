import { Body, Controller, Post } from '@nestjs/common';
import { CreateSessionDTO, RefreshTokenDTO } from './dtos';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(readonly sessionService: SessionService) {}

  @Post()
  async createSession(
    @Body() data: CreateSessionDTO,
  ): Promise<RefreshTokenDTO> {
    const { name, password } = data;

    const session = await this.sessionService.createSession(name, password);

    return session;
  }

  @Post('refresh')
  async refreshSession(
    @Body() data: RefreshTokenDTO,
  ): Promise<RefreshTokenDTO> {
    const { refresh_token } = data;

    const session = await this.sessionService.refreshSession(refresh_token);

    return session;
  }
}
