import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '@/shared/infra/auth/jwt/jwt-auth.guards';
import { Expense } from '@prisma/client';
import { CreateExpenseDTO, UpdateExpenseDTO } from './dtos';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async createExpense(@Body() data: CreateExpenseDTO): Promise<Expense> {
    const expense = await this.expensesService.create(data);

    return expense;
  }

  @Get('/:id')
  async findExpenseById(@Param('id') id: string): Promise<Expense> {
    const expense = await this.expensesService.findById(id);

    return expense;
  }

  @Patch()
  async updateExpense(@Body() data: UpdateExpenseDTO): Promise<Expense> {
    const expense = await this.expensesService.update(data);

    return expense;
  }

  @Delete('/:id')
  async deleteExpenseById(@Param('id') id: string): Promise<void> {
    await this.expensesService.delete(id);
  }
}
