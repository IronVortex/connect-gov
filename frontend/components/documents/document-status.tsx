'use client';

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
        return 'OK';
      case 'MISMATCH':
        return '!';
      case 'UNKNOWN':
        return '?';
      default:
        return '-';
    }
  };

  return (
    <div className="space-y-3">
      {documents.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No documents uploaded yet
        </p>
      ) : (
        documents.map((doc) => (
          <div
            key={doc._id}
            className="rounded-lg border-2 border-border p-4 transition-colors hover:border-[#007BFF]"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <h4 className="flex-1 truncate text-sm font-semibold text-foreground">
                {doc.fileName}
              </h4>
              <span
                className={`rounded border px-2 py-1 text-xs font-bold ${getStatusColor(
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
              <div className="mt-2 rounded border border-green-200 bg-green-50 p-2">
                <p className="text-xs text-green-800">
                  Document successfully identified as{' '}
                  <span className="font-semibold">{doc.detectedType}</span>
                </p>
              </div>
            )}

            {doc.status === 'MISMATCH' && (
              <div className="mt-2 rounded border border-red-200 bg-red-50 p-2">
                <p className="text-xs text-red-800">
                  File format does not match expected type
                </p>
              </div>
            )}

            {doc.status === 'UNKNOWN' && (
              <div className="mt-2 rounded border border-yellow-200 bg-yellow-50 p-2">
                <p className="text-xs text-yellow-800">
                  Unable to determine document type. Please verify manually.
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
