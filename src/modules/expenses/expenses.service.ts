import { prisma } from '@/shared/infra/database/prisma';
import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { Expense } from '@prisma/client';
import { CreateExpenseDTO, UpdateExpenseDTO } from './dtos';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ExpensesService {
  constructor(
    @Inject(REQUEST)
    private request: Request,
  ) {}

  async create(data: CreateExpenseDTO): Promise<Expense> {
    const expense = await prisma.expense.create({
      data: {
        date: new Date(data.date),
        description: data.description,
        userId: data.userId,
        value: data.value,
      },
    });

    return expense;
  }

  async findById(id: string): Promise<Expense> {
    const expense = await prisma.expense.findFirst({ where: { id } });

    if (this.request.user.id !== id) {
      throw new UnauthorizedException();
    }

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async update(data: UpdateExpenseDTO): Promise<Expense> {
    await this.findById(data.id);

    const expense = await prisma.expense.update({
      where: {
        id: data.id,
      },
      data: {
        date: data.date,
        description: data.description,
        userId: data.userId,
        value: data.value,
      },
    });

    return expense;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    await prisma.expense.delete({ where: { id } });
  }
}
