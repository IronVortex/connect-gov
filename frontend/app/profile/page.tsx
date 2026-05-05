'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage() {
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    department: 'General Public',
    joinedDate: '2025-01-15',
    applicationsCount: 3,
    documentsCount: 12,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <Link href="/dashboard" className="text-primary hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-foreground mt-4">
            Profile Settings
          </h1>
        </div>

        <Card className="p-8 space-y-6">
          <div className="border-b border-border pb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <p className="text-foreground text-lg mt-1">{userProfile.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <p className="text-foreground text-lg mt-1">{userProfile.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Department
                </label>
                <p className="text-foreground text-lg mt-1">
                  {userProfile.department}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Member Since
                </label>
                <p className="text-foreground text-lg mt-1">
                  {userProfile.joinedDate}
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-border pb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Activity Summary
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-sm text-muted-foreground mb-1">
                  Active Applications
                </p>
                <p className="text-3xl font-bold text-primary">
                  {userProfile.applicationsCount}
                </p>
              </Card>
              <Card className="p-4 bg-green-50 border-green-200">
                <p className="text-sm text-muted-foreground mb-1">
                  Uploaded Documents
                </p>
                <p className="text-3xl font-bold text-green-700">
                  {userProfile.documentsCount}
                </p>
              </Card>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full">Update Profile</Button>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full text-red-600">
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
