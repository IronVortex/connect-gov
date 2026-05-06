'use client';

import { useRef, useState } from 'react';
import { FileUp } from 'lucide-react';
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

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

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

      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB limit');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', 'temp-user-id');
      formData.append('serviceId', serviceId);

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
      <div>
        <p className="text-sm font-semibold text-[#007BFF]">
          Connect Gov Secure Upload
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-950">
          Upload required documents
        </h3>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all ${
          isDragging
            ? 'scale-105 border-[#007BFF] bg-blue-50'
            : 'border-border hover:border-[#007BFF] hover:bg-blue-50/50'
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
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
          <FileUp className="mx-auto h-10 w-10 text-[#007BFF]" aria-hidden="true" />
          <div>
            <p className="font-semibold text-foreground">
              {isLoading ? 'Uploading...' : 'Drag and drop your document'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              or click to browse
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            <span className="font-semibold">Error:</span> {error}
          </p>
        </div>
      )}

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-blue-900">
          Connect Gov Document Guide
        </h4>
        <ul className="space-y-1 text-xs text-blue-800">
          <li>Files are automatically detected and categorized.</li>
          <li>DETECTED: Document type successfully identified.</li>
          <li>MISMATCH: File type does not match filename.</li>
          <li>UNKNOWN: Could not determine document type.</li>
        </ul>
      </div>
    </div>
  );
}
