import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { DocumentDto } from './dto/document.dto';
import { IDocument } from './interface/document.interface';
import { Request } from 'express';
import { DocumentService } from './document.service';
import { AuthValidation } from 'src/auth/providers/auth-validation.provider';
import { UserId } from 'src/user/interface/user.interface';

@Controller('documents')
export class DocumentController {
  constructor(
    @Inject()
    private readonly documentService: DocumentService,
    private readonly authValidation: AuthValidation,
  ) {}

  private async getUserIdFromRequest(req: Request): Promise<string> {
    const token = await this.authValidation.extractTokenFromHeader(req);
    const decoded = await this.authValidation.validateToken(token);
    return (decoded as UserId).userId;
  }

  @Post('/upload')
  @HttpCode(200)
  async uploadDocument(
    @Body() documentDto: DocumentDto,
    @Req() req: Request,
  ): Promise<IDocument> {
    const userId = await this.getUserIdFromRequest(req);

    try {
      const uploadFile = await this.documentService.uploadDocument(
        documentDto,
        userId,
      );
      return uploadFile;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while uploading the document',
      );
    }
  }

  @Get()
  @HttpCode(200)
  async getDocuments(
    @Req() req: Request,
  ): Promise<{ message: string; documents: IDocument[] }> {
    const userId = await this.getUserIdFromRequest(req);

    try {
      const documents = await this.documentService.getDocuments(userId);
      return {
        message: 'Documents fetched successfully',
        documents,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching documents',
      );
    }
  }

  @Patch('/delete/:id')
  @HttpCode(200)
  async deleteDocument(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<{ message: string; file: IDocument }> {
    const userId = await this.getUserIdFromRequest(req);

    try {
      const deleteFile = await this.documentService.deleteDocument(id, userId);

      return {
        message: 'Document deleted successfully',
        file: deleteFile,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the document',
      );
    }
  }
}
