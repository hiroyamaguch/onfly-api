import { prisma } from '@/shared/infra/database/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { CreateExpenseDTO, UpdateExpenseDTO } from './dtos';

@Injectable()
export class ExpensesService {
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

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async update(data: UpdateExpenseDTO): Promise<Expense> {
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
    await prisma.expense.delete({ where: { id } });
  }
}
