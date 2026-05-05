import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Schema({ timestamps: true })
export class Application extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  serviceId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], default: [] })
  uploadedDocuments: Types.ObjectId[];

  @Prop({ type: String, enum: ApplicationStatus, default: ApplicationStatus.SUBMITTED })
  status: ApplicationStatus;

  @Prop({ type: String })
  notes: string;

  @Prop({ type: Date })
  submittedDate: Date;

  @Prop({ type: Date })
  reviewedDate: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
