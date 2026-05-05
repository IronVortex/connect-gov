import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  departmentId: string;

  @IsArray()
  @IsOptional()
  requiredDocuments: string[];
}

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  requiredDocuments: string[];
}
