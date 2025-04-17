import { Document } from 'mongoose';
import { UserSchema } from 'src/user/schema/user.schema';

export interface IDocument extends Document {
    fileName: string;
    date: Date;
    extension: string;
    fileContent: string;
    userId: typeof UserSchema; 
    isDeleted: boolean;
}