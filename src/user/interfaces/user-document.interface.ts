import { Document } from 'mongoose';
// 定義資料庫User資料屬性
export interface UserDoc extends Document {
  userId: string;
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image: string;
  createdAt: Date;
}
