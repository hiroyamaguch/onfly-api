import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExpenseDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  description?: string;

  @IsString()
  date?: string;

  @IsString()
  userId?: string;

  @IsNumber()
  value?: number;
}
