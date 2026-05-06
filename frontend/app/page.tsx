"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Bell, FileText, LayoutDashboard, WalletCards } from "lucide-react";
import { Department, DocumentStatus, Service, UploadedDocument } from "@/lib/types";
import { getUnreadNotificationCount } from "@/lib/mock-notifications";

type UploadState = {
  error?: string;
  file?: File;
  progress: number;
  status?: DocumentStatus;
  uploading: boolean;
};

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    href: "#services",
    icon: FileText,
  },
  {
    label: "Document Wallet",
    href: "#documents",
    icon: WalletCards,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: getUnreadNotificationCount(),
  },
];
const DEMO_USER_ID = "000000000000000000000001";

const fallbackDepartmentNames: Record<string, string> = {
  "000000000000000000000201": "Department of Motor Vehicles",
  "000000000000000000000202": "State Department",
  "000000000000000000000203": "Revenue Department",
};

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:3001/api"
  ).replace(/\/$/, "");
}

function getUploadKey(serviceId: string, documentName: string) {
  return `${serviceId}:${documentName}`;
}

function getStatusClass(status?: DocumentStatus) {
  if (status === DocumentStatus.DETECTED) {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }

  if (status === DocumentStatus.MISMATCH) {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }

  return "bg-slate-100 text-slate-700 ring-slate-200";
}

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [apiError, setApiError] = useState(false);
  const [loadingServices, setLoadingServices] = useState(true);
  const [uploads, setUploads] = useState<Record<string, UploadState>>({});
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const apiBaseUrl = getApiBaseUrl();

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        setApiError(false);

        const [servicesResponse, departmentsResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/services`),
          fetch(`${apiBaseUrl}/departments`),
        ]);

        if (!servicesResponse.ok) {
          throw new Error(`Services request failed: ${servicesResponse.status}`);
        }

        const nextServices = (await servicesResponse.json()) as Service[];
        const nextDepartments = departmentsResponse.ok
          ? ((await departmentsResponse.json()) as Department[])
          : [];

        if (!isMounted) return;

        setServices(nextServices);
        setDepartments(nextDepartments);
        setSelectedServiceId((current) => current || nextServices[0]?._id || null);
      } catch (error) {
        console.error("API unavailable:", error);
        if (isMounted) setApiError(true);
      } finally {
        if (isMounted) setLoadingServices(false);
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  const departmentNames = useMemo(() => {
    return departments.reduce<Record<string, string>>((names, department) => {
      names[department._id] = department.name;
      return names;
    }, {});
  }, [departments]);

  const selectedService = useMemo(() => {
    return services.find((service) => service._id === selectedServiceId) || null;
  }, [selectedServiceId, services]);

  const uploadedCount = Object.values(uploads).filter((upload) => upload.status).length;
  const requiredCount = selectedService?.requiredDocuments.length || 0;

  function getDepartmentName(service: Service) {
    return (
      departmentNames[service.departmentId] ||
      fallbackDepartmentNames[service.departmentId] ||
      service.departmentId ||
      "Unassigned department"
    );
  }

  function openFilePicker(serviceId: string, documentName: string) {
    fileInputs.current[getUploadKey(serviceId, documentName)]?.click();
  }

  function uploadFile(service: Service, documentName: string, file: File) {
    const uploadKey = getUploadKey(service._id, documentName);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("userId", DEMO_USER_ID);
    formData.append("serviceId", service._id);
    formData.append("documentName", documentName);

    setUploads((current) => ({
      ...current,
      [uploadKey]: {
        file,
        progress: 0,
        uploading: true,
      },
    }));

    const request = new XMLHttpRequest();
    request.open("POST", `${apiBaseUrl}/uploads`);

    request.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;

      const progress = Math.round((event.loaded / event.total) * 100);
      setUploads((current) => ({
        ...current,
        [uploadKey]: {
          ...current[uploadKey],
          file,
          progress,
          uploading: true,
        },
      }));
    };

    request.onload = () => {
      if (request.status < 200 || request.status >= 300) {
        setUploads((current) => ({
          ...current,
          [uploadKey]: {
            ...current[uploadKey],
            error: "Upload failed",
            file,
            progress: 0,
            uploading: false,
          },
        }));
        return;
      }

      const uploadedDocument = JSON.parse(request.responseText) as UploadedDocument;
      setUploads((current) => ({
        ...current,
        [uploadKey]: {
          file,
          progress: 100,
          status: uploadedDocument.status || DocumentStatus.UNKNOWN,
          uploading: false,
        },
      }));
    };

    request.onerror = () => {
      setUploads((current) => ({
        ...current,
        [uploadKey]: {
          ...current[uploadKey],
          error: "Upload failed",
          file,
          progress: 0,
          uploading: false,
        },
      }));
    };

    request.send(formData);
  }

  function handleFileChange(
    service: Service,
    documentName: string,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (file) {
      uploadFile(service, documentName, file);
    }
  }

  function retryUpload(service: Service, documentName: string) {
    const upload = uploads[getUploadKey(service._id, documentName)];

    if (upload?.file) {
      uploadFile(service, documentName, upload.file);
      return;
    }

    openFilePicker(service._id, documentName);
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-slate-50 px-6 py-6 lg:w-64 lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center gap-3">
            <img
              src="/connectgov-logo.png"
              alt="Connect Gov"
              className="h-10 w-10 rounded-md border border-blue-100"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#007BFF]">
                Connect Gov
              </p>
              <h1 className="mt-1 text-2xl font-bold">Dashboard</h1>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition ${
                    item.label === "Dashboard"
                      ? "bg-[#007BFF] text-white"
                      : "text-slate-700 hover:bg-white hover:text-[#007BFF]"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {!!item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        item.label === "Dashboard"
                          ? "bg-white text-[#007BFF]"
                          : "bg-[#007BFF] text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="flex-1 px-6 py-8 lg:px-10">
          {apiError && (
            <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
              API unavailable
            </div>
          )}

          <div id="services" className="mb-8">
            <p className="text-sm font-semibold text-[#007BFF]">
              Connect Gov services
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Services
            </h2>
          </div>

          <div className="mb-8">
            {loadingServices ? (
              <p className="rounded-md border border-slate-200 px-4 py-5 text-sm text-slate-600">
                Loading services...
              </p>
            ) : services.length === 0 ? (
              <p className="rounded-md border border-slate-200 px-4 py-5 text-sm text-slate-600">
                No services available
              </p>
            ) : (
              <div className="grid gap-4 xl:grid-cols-2">
                {services.map((service) => (
                  <button
                    key={service._id}
                    type="button"
                    onClick={() => setSelectedServiceId(service._id)}
                    className={`rounded-md border bg-white p-5 text-left shadow-sm transition ${
                      selectedServiceId === service._id
                        ? "border-[#007BFF] ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-[#007BFF]"
                    }`}
                  >
                    <h3 className="font-semibold text-slate-950">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {getDepartmentName(service)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.requiredDocuments.map((document) => (
                        <span
                          key={document}
                          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#007BFF]"
                        >
                          {document}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div id="documents">
            <h3 className="mb-4 text-xl font-semibold">Documents Required</h3>
            {!selectedService ? (
              <p className="rounded-md border border-slate-200 px-4 py-5 text-sm text-slate-600">
                Select a service to view required documents.
              </p>
            ) : selectedService.requiredDocuments.length === 0 ? (
              <p className="rounded-md border border-slate-200 px-4 py-5 text-sm text-slate-600">
                No required documents for this service.
              </p>
            ) : (
              <ul className="grid gap-3">
                {selectedService.requiredDocuments.map((documentName) => {
                  const uploadKey = getUploadKey(selectedService._id, documentName);
                  const upload = uploads[uploadKey];

                  return (
                    <li
                      key={documentName}
                      className="rounded-md border border-slate-200 bg-white px-4 py-4 shadow-sm"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-slate-800">
                            {documentName}
                          </p>
                          {upload?.error && (
                            <p className="mt-1 text-sm text-red-600">
                              Upload failed
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {upload?.status && (
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getStatusClass(upload.status)}`}
                            >
                              {upload.status}
                            </span>
                          )}
                          {upload?.error ? (
                            <button
                              type="button"
                              onClick={() => retryUpload(selectedService, documentName)}
                              className="rounded-md border border-[#007BFF] px-4 py-2 text-sm font-semibold text-[#007BFF] transition hover:bg-blue-50"
                            >
                              Retry
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => openFilePicker(selectedService._id, documentName)}
                              disabled={upload?.uploading}
                              className="rounded-md bg-[#007BFF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {upload?.uploading ? "Uploading" : "Upload"}
                            </button>
                          )}
                          <input
                            ref={(node) => {
                              fileInputs.current[uploadKey] = node;
                            }}
                            type="file"
                            className="hidden"
                            onChange={(event) =>
                              handleFileChange(selectedService, documentName, event)
                            }
                          />
                        </div>
                      </div>

                      {upload?.uploading && (
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-[#007BFF] transition-all"
                            style={{ width: `${upload.progress}%` }}
                          />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        <aside className="border-t border-slate-200 bg-slate-50 px-6 py-8 lg:w-80 lg:border-l lg:border-t-0">
          <section className="mb-8 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Application Summary</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Service</dt>
                <dd className="text-right font-semibold">
                  {selectedService?.name || "Not selected"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Documents</dt>
                <dd className="font-semibold">
                  {uploadedCount} of {requiredCount} uploaded
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Status</dt>
                <dd className="font-semibold text-[#007BFF]">Draft</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-md border border-blue-100 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Tips</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Upload clear scans or photos with all corners visible.</li>
              <li>Use current address proof to avoid review delays.</li>
              <li>Retry failed uploads after checking the backend is running.</li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
