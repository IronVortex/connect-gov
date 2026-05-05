import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Department extends Document {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ default: true, type: Boolean })
  isActive: boolean;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
