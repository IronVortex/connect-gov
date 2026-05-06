'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Sidebar from '@/components/layout/sidebar';
import DocumentUploader from '@/components/documents/document-uploader';
import ServiceSelector from '@/components/services/service-selector';
import DocumentStatus from '@/components/documents/document-status';
import { Department, Service } from '@/lib/types';
import { departmentAPI, serviceAPI } from '@/lib/api';

export default function DashboardPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await departmentAPI.getAll();
        setDepartments(data);
      } catch (error) {
        console.error('Failed to load departments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      const loadServices = async () => {
        try {
          const data = await serviceAPI.getByDepartment(selectedDepartment);
          setServices(data);
        } catch (error) {
          console.error('Failed to load services:', error);
        }
      };

      loadServices();
    }
  }, [selectedDepartment]);

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setSelectedService(null);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleFileUpload = (file: any) => {
    setUploadedFiles([...uploadedFiles, file]);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        departments={departments}
        selectedDepartment={selectedDepartment}
        onDepartmentSelect={handleDepartmentSelect}
      />

      <div className="flex-1 flex gap-4 p-6 overflow-hidden">
        <div className="flex-1 min-w-0">
          <Card className="h-full overflow-y-auto border-blue-100 shadow-sm">
            <div className="p-6">
              <p className="mb-2 text-sm font-semibold text-[#007BFF]">
                Connect Gov Dashboard
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Document Upload
              </h2>
              {selectedService ? (
                <DocumentUploader
                  serviceId={selectedService}
                  onUpload={handleFileUpload}
                />
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <p>Select a service to upload documents</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div id="services" className="w-80 min-w-0">
          <Card className="h-full overflow-y-auto border-blue-100 shadow-sm">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Services
              </h2>
              {selectedDepartment ? (
                <ServiceSelector
                  services={services}
                  selectedService={selectedService}
                  onServiceSelect={handleServiceSelect}
                />
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <p>Select a department first</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div id="documents" className="w-80 min-w-0">
          <Card className="h-full overflow-y-auto border-blue-100 shadow-sm">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Status
              </h2>
              {uploadedFiles.length > 0 ? (
                <DocumentStatus documents={uploadedFiles} />
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <p>Upload documents to see status</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
