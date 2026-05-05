import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UploadDocumentDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @IsString()
  @IsNotEmpty()
  fileName!: string;

  @IsNumber()
  @IsNotEmpty()
  fileSize!: number;

  @IsString()
  @IsNotEmpty()
  mimeType!: string;
}

export class DetectDocumentDto {
  @IsString()
  @IsNotEmpty()
  fileName!: string;

  @IsString()
  @IsNotEmpty()
  mimeType!: string;
}

