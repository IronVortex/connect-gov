import { useState } from 'react';
import Link from 'next/link';
import { Bell, CheckCircle2, Circle } from 'lucide-react';
import { mockNotifications } from '@/lib/mock-notifications';

export default function NotificationsPage() {
  const [notifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(
    (notification) => notification.status === 'unread',
  ).length;

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-[#007BFF] transition hover:text-blue-600"
            >
              Back to Dashboard
            </Link>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[#007BFF]">
                <Bell className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="mt-1 text-sm text-slate-600">
                  {unreadCount} unread update{unreadCount === 1 ? '' : 's'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-md border border-blue-100 bg-white shadow-sm">
          <div className="border-b border-blue-100 bg-blue-50/60 px-5 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#007BFF]">
              Connect Gov Updates
            </h2>
          </div>

          <ul className="divide-y divide-slate-100">
            {notifications.map((notification) => {
              const isUnread = notification.status === 'unread';
              const StatusIcon = isUnread ? Circle : CheckCircle2;

              return (
                <li
                  key={notification.id}
                  className={`px-5 py-5 transition hover:bg-blue-50/50 ${
                    isUnread ? 'bg-white' : 'bg-slate-50/60'
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-3">
                      <StatusIcon
                        className={`mt-1 h-4 w-4 ${
                          isUnread ? 'fill-[#007BFF] text-[#007BFF]' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-950">
                            {notification.title}
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
                              isUnread
                                ? 'bg-blue-100 text-[#007BFF]'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {notification.status}
                          </span>
                        </div>
                        <p className="mt-1 max-w-2xl text-sm text-slate-600">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                    <time className="shrink-0 text-sm text-slate-500">
                      {notification.timestamp}
                    </time>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
