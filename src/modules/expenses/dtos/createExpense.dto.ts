import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDTO {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
