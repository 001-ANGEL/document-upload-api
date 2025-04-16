import { Document } from 'mongoose';

export interface IDocument extends Document {
    fileName: string;
    date: Date;
    extension: string;
    fileContent: string;
    userId: any;
    isDeleted: boolean;
}