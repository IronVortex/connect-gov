import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum DocumentStatus {
  DETECTED = 'DETECTED',
  MISMATCH = 'MISMATCH',
  UNKNOWN = 'UNKNOWN',
}

@Schema({ timestamps: true })
export class UploadedDocument extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  serviceId: Types.ObjectId;

  @Prop({ required: true, type: String })
  fileName: string;

  @Prop({ required: true, type: Number })
  fileSize: number;

  @Prop({ required: true, type: String })
  mimeType: string;

  @Prop({ required: true, type: String })
  filePath: string;

  @Prop({ type: String, enum: DocumentStatus, default: DocumentStatus.UNKNOWN })
  status: DocumentStatus;

  @Prop({ type: String })
  detectedType: string;

  @Prop({ type: Object })
  extractedData: Record<string, any>;

  @Prop({ default: false, type: Boolean })
  verified: boolean;
}

export const UploadedDocumentSchema = SchemaFactory.createForClass(UploadedDocument);
