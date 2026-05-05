import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { DepartmentController } from '@/controllers/department.controller';
import { ServiceController } from '@/controllers/service.controller';
import { DocumentController } from '@/controllers/document.controller';
import { UploadController } from '@/controllers/upload.controller';

import { DepartmentService } from '@/services/department.service';
import { ServiceService } from '@/services/service.service';
import { DocumentService } from '@/services/document.service';

import { Department, DepartmentSchema } from '@/schemas/department.schema';
import { Service, ServiceSchema } from '@/schemas/service.schema';
import { UploadedDocument, UploadedDocumentSchema } from '@/schemas/uploaded-document.schema';
import { User, UserSchema } from '@/schemas/user.schema';
import { Application, ApplicationSchema } from '@/schemas/application.schema';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/connect-platform'),
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: UploadedDocument.name, schema: UploadedDocumentSchema },
      { name: User.name, schema: UserSchema },
      { name: Application.name, schema: ApplicationSchema },
    ]),
  ],
  controllers: [
    DepartmentController,
    ServiceController,
    DocumentController,
    UploadController,
  ],
  providers: [DepartmentService, ServiceService, DocumentService],
})
export class AppModule {}
