import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// @Schema(_{Prop:...}, option)
// 第一個Prop會自動找到下方的@Prop
// 第二個Options是資料的自動編號(autoIndex)或儲存(validateBeforeSave)等等設定
@Schema()
export class User extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  googleId: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
