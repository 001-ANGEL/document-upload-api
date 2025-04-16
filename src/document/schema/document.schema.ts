import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { IDocument } from '../interface/document.interface';
import { UserSchema } from 'src/user/schema/user.schema';

export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class File extends Document implements IDocument {
  @Prop({ required: true, trim: true })
  fileName: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, trim: true, enum: ['pdf', 'doc', 'docx'] })
  extension: string;

  @Prop({ required: true })
  fileContent: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: typeof UserSchema;

  @Prop({ required: false, default: false })
  isDeleted: boolean;
}

export const FileSchema = SchemaFactory.createForClass(File);
