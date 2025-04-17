import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentDto } from './dto/document.dto';
import { AuthValidation } from 'src/auth/providers/auth-validation.provider';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDocument } from './interface/document.interface';
import { DocumentPaginationDto } from './dto/document-pagination.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('File')
    private readonly fileModel: Model<IDocument>,

    private readonly authValidation: AuthValidation,
  ) {}

  async uploadDocument(
    documentDto: DocumentDto,
    userId: string,
  ): Promise<IDocument> {
    const data = {
      userId: userId,
      ...documentDto,
    };

    const saveDocument = await this.fileModel.create(data);
    return saveDocument;
  }

  async getDocuments(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<IDocument[]> {

    const documents = await this.fileModel
      .find({ userId: userId, isDeleted: false })
      .skip(offset)
      .limit(limit)
      .exec();
    return documents;
  }

  async deleteDocument(documentId: string, userId: string): Promise<IDocument> {
    const document = await this.fileModel.findOne({
      _id: documentId,
      userId,
      isDeleted: false,
    });

    if (!document) {
      throw new NotFoundException('Document not found or already deleted');
    }

    document.isDeleted = true;
    await document.save();

    return document;
  }
}
