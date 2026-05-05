'use client';

import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface ServiceSelectorProps {
  services: Service[];
  selectedService: string | null;
  onServiceSelect: (id: string) => void;
}

export default function ServiceSelector({
  services,
  selectedService,
  onServiceSelect,
}: ServiceSelectorProps) {
  return (
    <div className="space-y-3">
      {services.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No services available
        </p>
      ) : (
        services.map((service) => (
          <button
            key={service._id}
            onClick={() => onServiceSelect(service._id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
              selectedService === service._id
                ? 'border-primary bg-blue-50'
                : 'border-border hover:border-primary'
            }`}
          >
            <h3 className="font-semibold text-foreground mb-1">
              {service.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {service.description || 'No description'}
            </p>
            {service.requiredDocuments && service.requiredDocuments.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Required Documents:
                </p>
                <div className="flex flex-wrap gap-1">
                  {service.requiredDocuments.map((doc, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </button>
        ))
      )}
    </div>
  );
}
