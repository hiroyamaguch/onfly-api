import { User } from '@prisma/client';
import { Request as IRequest } from 'express';

declare module 'express' {
  interface Request extends IRequest {
    user: User;
  }
}
