import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { add, sub } from 'date-fns';
import { ExpensesController } from './expenses.controller';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

describe('Expenses Service', () => {
  let service: ExpensesService;

  beforeEach(async () => {
    const mockRequest: Partial<Request> = {
      url: '/example',
      method: 'GET',
      params: { id: '123' },
      query: { page: '1' },
      body: { data: 'example' },
      headers: { 'content-type': 'application/json' },
      get: jest.fn(),
      header: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      exports: [ExpensesService],
      providers: [
        ExpensesService,
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
      ],
    }).compile();

    service = await module.resolve<ExpensesService>(ExpensesService);
  });

  it('should create expense', async () => {
    await expect(
      service.create({
        date: add(new Date(), { years: 1 }).toString(),
        description: 'Test',
        userId: '7b7eeca8-dd1c-4c9d-9d91-8201fab69270',
        value: 12.54,
      }),
    ).resolves.toBeDefined();
  });

  it('should not create session with wrong user', async () => {
    await expect(
      service.create({
        date: add(new Date(), { years: 1 }).toString(),
        description: 'Test',
        userId: '1',
        value: -12.54,
      }),
    ).rejects.toThrow('Inexistent user, please try again.');
  });

  it('should not create session with description bigger than 191', async () => {
    await expect(
      service.create({
        date: add(new Date(), { years: 1 }).toString(),
        description:
          'O progresso tecnológico acelerado tem transformado profundamente a maneira como vivemos, trabalhamos e nos conectamos, moldando um futuro repleto de inovações e desafios interconectados. Testando o erro de 191 caracteres.',
        userId: '7b7eeca8-dd1c-4c9d-9d91-8201fab69270',
        value: 12.54,
      }),
    ).rejects.toThrow('The description can have a maximum of 191 characters.');
  });

  it('should not create session with negative value', async () => {
    await expect(
      service.create({
        date: add(new Date(), { years: 1 }).toString(),
        description: 'Test',
        userId: '7b7eeca8-dd1c-4c9d-9d91-8201fab69270',
        value: -12.54,
      }),
    ).rejects.toThrow('The value must be positive.');
  });

  it('should not create session with past date', async () => {
    await expect(
      service.create({
        date: sub(new Date(), { years: 1 }).toString(),
        description: 'Test',
        userId: '7b7eeca8-dd1c-4c9d-9d91-8201fab69270',
        value: -12.54,
      }),
    ).rejects.toThrow('A past date cannot be used.');
  });
});
