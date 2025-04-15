import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { IUser } from '../interface/user.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document implements IUser {
  @Prop({ required: true, trim: true, minlength: 3, maxlength: 50 })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, trim: true, minlength: 8 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
