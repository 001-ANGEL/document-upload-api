import { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';

export interface IUser  extends Document {
  fullName: string;
  email: string;
  password: string;
}

// User interface for JWT payload
export interface UserId extends JwtPayload {
  userId: string;
}
