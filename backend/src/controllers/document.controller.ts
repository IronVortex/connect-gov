import { Controller, Post, Get, Param, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from '@/services/document.service';
import { DetectDocumentDto } from '@/dto/document.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.documentService.findByUserId(userId);
  }

  @Get('service/:serviceId')
  async findByServiceId(@Param('serviceId') serviceId: string) {
    return this.documentService.findByServiceId(serviceId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.documentService.findById(id);
  }

  @Post('detect')
  async detectDocument(@Body() detectDocumentDto: DetectDocumentDto) {
    const { fileName, mimeType } = detectDocumentDto;
    
    if (!fileName || !mimeType) {
      throw new BadRequestException('fileName and mimeType are required');
    }

    const result = await this.documentService.detectDocument(fileName, mimeType);
    return result;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      throw new BadRequestException('File size exceeds 5MB limit');
    }

    const { userId, serviceId } = body;
    if (!userId || !serviceId) {
      throw new BadRequestException('userId and serviceId are required');
    }

    // Detect document type
    const detectionResult = await this.documentService.detectDocument(
      file.originalname,
      file.mimetype,
    );

    // Create document record
    const documentData = {
      userId,
      serviceId,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      filePath: `/uploads/${Date.now()}-${file.originalname}`,
      status: detectionResult.status,
      detectedType: detectionResult.detectedType,
    };

    const createdDocument = await this.documentService.create(documentData);
    return createdDocument;
  }

  @Post(':id/delete')
  async deleteDocument(@Param('id') id: string) {
    await this.documentService.delete(id);
    return { success: true, message: 'Document deleted successfully' };
  }
}
