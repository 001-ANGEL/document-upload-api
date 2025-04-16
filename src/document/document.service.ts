import { Injectable } from '@nestjs/common';
import { DocumentDto } from './dto/document.dto';
import { Request } from 'express';
import { AuthValidation } from 'src/auth/providers/auth-validation.provider';
import { UserId } from 'src/user/interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDocument } from './interface/document.interface';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('File')
    private readonly fileModel: Model<IDocument>,

    private readonly authValidation: AuthValidation,
  ) {}

  async uploadDocument(
    documentDto: DocumentDto,
    req: Request,
  ): Promise<IDocument> {
    const token = await this.authValidation.extractTokenFromHeader(req);
    const decoded = await this.authValidation.validateToken(token);

    const userId = (decoded as UserId).userId;

    const data = {
      userId: userId,
      ...documentDto,
    };

    const saveDocument = await this.fileModel.create(data);
    return saveDocument;
  }

  async getDocuments(): Promise<any> {
    return { message: 'Documents retrieved successfully' };
  }

  async deleteDocument(documentId: string): Promise<any> {
    return { message: 'Document deleted successfully' };
  }
}
