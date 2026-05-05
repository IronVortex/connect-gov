'use client';

import { useState } from 'react';
import { UploadedDocument, DocumentStatus as DocStatus } from '@/lib/types';

interface DocumentStatusProps {
  documents: UploadedDocument[];
}

export default function DocumentStatus({ documents }: DocumentStatusProps) {
  const getStatusColor = (status: DocStatus) => {
    switch (status) {
      case 'DETECTED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'MISMATCH':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'UNKNOWN':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: DocStatus) => {
    switch (status) {
      case 'DETECTED':
        return '✓';
      case 'MISMATCH':
        return '✗';
      case 'UNKNOWN':
        return '?';
      default:
        return '•';
    }
  };

  return (
    <div className="space-y-3">
      {documents.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No documents uploaded yet
        </p>
      ) : (
        documents.map((doc) => (
          <div
            key={doc._id}
            className="p-4 rounded-lg border-2 border-border hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-semibold text-sm text-foreground truncate flex-1">
                {doc.fileName}
              </h4>
              <span
                className={`text-xs font-bold px-2 py-1 rounded border ${getStatusColor(
                  doc.status
                )}`}
              >
                {getStatusIcon(doc.status)} {doc.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <p className="font-medium">Size:</p>
                <p>{(doc.fileSize / 1024).toFixed(2)} KB</p>
              </div>
              <div>
                <p className="font-medium">Type:</p>
                <p>{doc.detectedType || 'Unknown'}</p>
              </div>
            </div>

            {doc.status === 'DETECTED' && (
              <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                <p className="text-xs text-green-800">
                  ✓ Document successfully identified as{' '}
                  <span className="font-semibold">{doc.detectedType}</span>
                </p>
              </div>
            )}

            {doc.status === 'MISMATCH' && (
              <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
                <p className="text-xs text-red-800">
                  ✗ File format does not match expected type
                </p>
              </div>
            )}

            {doc.status === 'UNKNOWN' && (
              <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  ? Unable to determine document type. Please verify manually.
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
