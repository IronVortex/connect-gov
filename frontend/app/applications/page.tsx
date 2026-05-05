'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function ApplicationsPage() {
  const [applications] = useState([
    {
      id: '1',
      service: 'Driver License Renewal',
      department: 'DMV',
      status: 'APPROVED',
      submittedDate: '2025-05-01',
      documentsCount: 3,
    },
    {
      id: '2',
      service: 'Passport Application',
      department: 'State Department',
      status: 'UNDER_REVIEW',
      submittedDate: '2025-05-03',
      documentsCount: 5,
    },
    {
      id: '3',
      service: 'Tax Return Filing',
      department: 'Revenue',
      status: 'SUBMITTED',
      submittedDate: '2025-05-04',
      documentsCount: 8,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <Link href="/dashboard" className="text-primary hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-foreground mt-4">
            Your Applications
          </h1>
          <p className="text-muted-foreground mt-2">
            Track the status of all your submitted applications
          </p>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {app.service}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {app.department} • Submitted {app.submittedDate}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    📄 {app.documentsCount} documents
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {applications.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">
              No applications yet. Start by uploading documents in the dashboard.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
