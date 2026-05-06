'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, FileText, LayoutDashboard, WalletCards } from 'lucide-react';
import { Department } from '@/lib/types';
import { getUnreadNotificationCount } from '@/lib/mock-notifications';

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
  const pathname = usePathname();
  const unreadNotifications = getUnreadNotificationCount();
  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Services',
      href: '/dashboard#services',
      icon: FileText,
    },
    {
      label: 'Document Wallet',
      href: '/dashboard#documents',
      icon: WalletCards,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: Bell,
      badge: unreadNotifications,
    },
  ];

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
          <h3 className="mb-3 px-2 text-sm font-semibold text-slate-900">
            Main
          </h3>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#007BFF] text-white'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-[#007BFF]'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {!!item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      isActive
                        ? 'bg-white text-[#007BFF]'
                        : 'bg-[#007BFF] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <nav className="mt-8 space-y-2 border-t border-blue-100 pt-6">
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
