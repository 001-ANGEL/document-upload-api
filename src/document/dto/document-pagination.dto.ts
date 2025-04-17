import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class DocumentPaginationDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  offset: number;
}
