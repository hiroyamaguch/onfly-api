import { prisma } from '@/shared/infra/database/prisma';
import { Resend } from 'resend';
import {
  BadRequestException,
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
import { isBefore } from 'date-fns';

@Injectable({ scope: Scope.REQUEST })
export class ExpensesService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  constructor(
    @Inject(REQUEST)
    private request: Request,
  ) {}

  async create(data: CreateExpenseDTO): Promise<Expense> {
    const user = await prisma.user.findFirst({ where: { id: data.userId } });

    if (!user) {
      throw new BadRequestException('Inexistent user, please try again.');
    }

    if (isBefore(new Date(data.date), new Date())) {
      throw new BadRequestException('A past date cannot be used.');
    }

    if (data.value < 0) {
      throw new BadRequestException('The value must be positive.');
    }

    if (data.description.length > 191) {
      throw new BadRequestException(
        'The description can have a maximum of 191 characters.',
      );
    }

    const expense = await prisma.expense.create({
      data: {
        date: new Date(data.date),
        description: data.description,
        userId: data.userId,
        value: data.value,
      },
    });

    try {
      await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: user.email,
        subject: 'Nova despesa criada com sucesso!',
        html: `<p>Parabéns, a despesa de identificador <strong>${expense.id}</strong>, no valor de <strong>R$ ${expense.value}</strong> foi criada com sucesso!</p>`,
      });
    } catch (error) {
      console.log(error);
    }

    return expense;
  }

  async findById(id: string): Promise<Expense> {
    const expense = await prisma.expense.findFirst({ where: { id } });

    if (this.request.user.id !== expense.userId) {
      throw new UnauthorizedException();
    }

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async update(data: UpdateExpenseDTO): Promise<Expense> {
    // Verifica se o usuário que está alterando realmente é o dono da despesa
    await this.findById(data.id);

    if (data.date && isBefore(new Date(data.date), new Date())) {
      throw new BadRequestException('A past date cannot be used.');
    }

    if (data.value && data.value < 0) {
      throw new BadRequestException('The value must be positive.');
    }

    if (data.description && data.description.length > 191) {
      throw new BadRequestException(
        'The description can have a maximum of 191 characters.',
      );
    }

    const expense = await prisma.expense.update({
      where: {
        id: data.id,
      },
      data: {
        date: data.date,
        description: data.description,
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
