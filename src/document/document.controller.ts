import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { DocumentDto } from './dto/document.dto';
import { IDocument } from './interface/document.interface';
import { Request } from 'express';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(
    @Inject()
    private readonly documentServie: DocumentService,
  ) {}

  @Post('/upload')
  @HttpCode(200)
  async uploadDocument(
    @Body() documentDto: DocumentDto,
    @Req() req: Request,
  ): Promise<IDocument> {
    const uploadFile = await this.documentServie.uploadDocument(
      documentDto,
      req,
    );
    return uploadFile;
  }

  @Get()
  @HttpCode(200)
  async getDocuments(): Promise<any> {
    // Logic to retrieve documents
    return { message: 'Documents retrieved successfully' };
  }

  @Patch('/delete')
  @HttpCode(200)
  async deleteDocument(@Param('id') id: string): Promise<any> {
    // Logic to handle document deletion
    return { message: 'Document deleted successfully' };
  }
}
