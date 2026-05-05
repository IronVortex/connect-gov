import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Service extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ required: true, type: Types.ObjectId })
  departmentId: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  requiredDocuments: string[];

  @Prop({ default: true, type: Boolean })
  isActive: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
