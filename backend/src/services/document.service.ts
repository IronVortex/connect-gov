import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadedDocument, DocumentStatus } from '@/schemas/uploaded-document.schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(UploadedDocument.name) private documentModel: Model<UploadedDocument>,
  ) {}

  async create(documentData: any): Promise<UploadedDocument> {
    const createdDocument = new this.documentModel(documentData);
    return createdDocument.save();
  }

  async findById(id: string): Promise<UploadedDocument | null> {
    return this.documentModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<UploadedDocument[]> {
    return this.documentModel.find({ userId }).exec();
  }

  async findByServiceId(serviceId: string): Promise<UploadedDocument[]> {
    return this.documentModel.find({ serviceId }).exec();
  }

  async updateStatus(
    id: string,
    status: DocumentStatus,
    detectedType: string | null = null,
  ): Promise<UploadedDocument | null> {
    const updateData: any = { status };
    if (detectedType) {
      updateData.detectedType = detectedType;
    }
    return this.documentModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async detectDocument(
    fileName: string,
    mimeType: string,
  ): Promise<{ status: DocumentStatus; detectedType: string | null }> {
    // Simple document detection logic based on file extension and MIME type
    const lowerFileName = fileName.toLowerCase();

    const documentTypes: Record<string, string[]> = {
      'national-id': ['id.pdf', 'passport', 'national-id', 'nid'],
      'birth-certificate': ['birth', 'birth-certificate'],
      'marriage-certificate': ['marriage', 'marriage-certificate'],
      'proof-of-residence': ['proof', 'residence', 'utility', 'ror'],
      'income-statement': ['income', 'statement', 'payslip', '1040'],
      'tax-return': ['tax', 'return', 'irs', '1040'],
    };

    for (const [docType, keywords] of Object.entries(documentTypes)) {
      if (keywords.some((keyword) => lowerFileName.includes(keyword))) {
        return {
          status: DocumentStatus.DETECTED,
          detectedType: docType,
        };
      }
    }

    // Check MIME type for PDFs or images
    if (mimeType.includes('pdf') || mimeType.includes('image')) {
      return {
        status: DocumentStatus.UNKNOWN,
        detectedType: null,
      };
    }

    return {
      status: DocumentStatus.MISMATCH,
      detectedType: null,
    };
  }

  async delete(id: string): Promise<void> {
    await this.documentModel.findByIdAndDelete(id).exec();
  }
}

