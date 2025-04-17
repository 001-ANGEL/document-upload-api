import { IsDateString, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class DocumentDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsIn(['pdf', 'doc', 'docx'])
  @IsNotEmpty()
  extension: string;

  @IsString()
  @IsNotEmpty()
  fileContent: string;
}
