import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from '@/services/document.service';

@Controller('uploads')
export class UploadController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const maxFileSize = 5 * 1024 * 1024;
    if (file.size > maxFileSize) {
      throw new BadRequestException('File size exceeds 5MB limit');
    }

    const { userId, serviceId } = body;
    if (!userId || !serviceId) {
      throw new BadRequestException('userId and serviceId are required');
    }

    const detectionResult = await this.documentService.detectDocument(
      file.originalname,
      file.mimetype,
    );

    return this.documentService.create({
      userId,
      serviceId,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      filePath: `/uploads/${Date.now()}-${file.originalname}`,
      status: detectionResult.status,
      detectedType: detectionResult.detectedType,
    });
  }
}
