'use client';

import { Department } from '@/lib/types';

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
    <aside className="w-64 overflow-y-auto border-r border-blue-100 bg-white">
      <div className="p-6">
        <div className="mb-8 flex items-center gap-3">
          <img
            src="/connectgov-logo.png"
            alt="Connect Gov"
            className="h-10 w-10 rounded-md border border-blue-100"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-950">
              Connect Gov
            </h1>
            <p className="text-sm text-slate-500">Citizen services</p>
          </div>
        </div>

        <nav className="space-y-2">
          <h3 className="mb-4 px-2 text-sm font-semibold text-slate-900">
            Departments
          </h3>
          {departments.length === 0 ? (
            <p className="px-2 text-sm text-slate-500">
              No departments available
            </p>
          ) : (
            departments.map((dept) => (
              <button
                key={dept._id}
                onClick={() => onDepartmentSelect(dept._id)}
                className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium transition-colors ${
                  selectedDepartment === dept._id
                    ? 'bg-[#007BFF] text-white'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-[#007BFF]'
                }`}
              >
                {dept.name}
              </button>
            ))
          )}
        </nav>

        <div className="mt-8 border-t border-blue-100 pt-8">
          <p className="text-center text-xs text-slate-500">
            &copy; 2026 Connect Gov
          </p>
        </div>
      </div>
    </aside>
  );
}
