import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class DocumentPaginationDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsPositive()
  @IsOptional() 
  offset: number;
}
