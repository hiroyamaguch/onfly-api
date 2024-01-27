import { Body, Controller, Post } from '@nestjs/common';
import { CreateSessionDTO, RefreshTokenDTO } from './dtos';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() data: CreateSessionDTO): Promise<RefreshTokenDTO> {
    const { name, password } = data;

    const session = await this.sessionService.create(name, password);

    return session;
  }

  @Post('refresh')
  async refresh(@Body() data: RefreshTokenDTO): Promise<RefreshTokenDTO> {
    const { refresh_token } = data;

    const session = await this.sessionService.refresh(refresh_token);

    return session;
  }
}
