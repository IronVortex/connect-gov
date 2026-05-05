import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: Types.ObjectId })
  department: Types.ObjectId;

  @Prop({ default: true, type: Boolean })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
