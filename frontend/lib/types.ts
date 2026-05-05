export interface Department {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  name: string;
  description?: string;
  departmentId: string;
  requiredDocuments: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum DocumentStatus {
  DETECTED = 'DETECTED',
  MISMATCH = 'MISMATCH',
  UNKNOWN = 'UNKNOWN',
}

export interface UploadedDocument {
  _id: string;
  userId: string;
  serviceId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  filePath: string;
  status: DocumentStatus;
  detectedType?: string;
  extractedData?: Record<string, any>;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  userId: string;
  serviceId: string;
  uploadedDocuments: string[];
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  notes?: string;
  submittedDate?: string;
  reviewedDate?: string;
  createdAt: string;
  updatedAt: string;
}
