'use client';

import { Department } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SidebarProps {
  departments: Department[];
  selectedDepartment: string | null;
  onDepartmentSelect: (id: string) => void;
}

export default function Sidebar({
  departments,
  selectedDepartment,
  onDepartmentSelect,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-sidebar-foreground">
            Connect
          </h1>
          <p className="text-sm text-muted-foreground">Platform</p>
        </div>

        <nav className="space-y-2">
          <h3 className="text-sm font-semibold text-sidebar-foreground mb-4 px-2">
            Departments
          </h3>
          {departments.length === 0 ? (
            <p className="text-sm text-muted-foreground px-2">
              No departments available
            </p>
          ) : (
            departments.map((dept) => (
              <button
                key={dept._id}
                onClick={() => onDepartmentSelect(dept._id)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  selectedDepartment === dept._id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                {dept.name}
              </button>
            ))
          )}
        </nav>

        <div className="mt-8 pt-8 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">
            © 2026 Connect Platform
          </p>
        </div>
      </div>
    </aside>
  );
}
