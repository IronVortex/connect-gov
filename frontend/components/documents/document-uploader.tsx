'use client';

import { useState, useRef } from 'react';
import { documentAPI } from '@/lib/api';
import { UploadedDocument } from '@/lib/types';

interface DocumentUploaderProps {
  serviceId: string;
  onUpload: (document: UploadedDocument) => void;
}

export default function DocumentUploader({
  serviceId,
  onUpload,
}: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = async (file: File) => {
    try {
      setError(null);
      setIsLoading(true);

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB limit');
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', 'temp-user-id'); // TODO: Get from auth
      formData.append('serviceId', serviceId);

      // Upload document
      const uploadedDoc = await documentAPI.upload(formData);
      onUpload(uploadedDoc);
    } catch (err: any) {
      setError(err.message || 'Failed to upload document');
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-primary bg-blue-50 scale-105'
            : 'border-border hover:border-primary hover:bg-muted/50'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />

        <div className="space-y-3">
          <div className="text-4xl">📄</div>
          <div>
            <p className="font-semibold text-foreground">
              {isLoading ? 'Uploading...' : 'Drag and drop your document'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg border border-red-300 bg-red-50">
          <p className="text-sm text-red-800">
            <span className="font-semibold">Error:</span> {error}
          </p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-sm text-blue-900 mb-2">
          Document Detection Guide
        </h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Files are automatically detected and categorized</li>
          <li>• DETECTED: Document type successfully identified</li>
          <li>• MISMATCH: File type doesn&apos;t match filename</li>
          <li>• UNKNOWN: Could not determine document type</li>
        </ul>
      </div>
    </div>
  );
}
