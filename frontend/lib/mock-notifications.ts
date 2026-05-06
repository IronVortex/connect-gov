export type NotificationStatus = 'read' | 'unread';

export type ConnectGovNotification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: NotificationStatus;
};

export const mockNotifications: ConnectGovNotification[] = [
  {
    id: '1',
    title: 'Address proof detected',
    description: 'Your uploaded utility bill was identified and added to your document wallet.',
    timestamp: 'Today, 10:15 AM',
    status: 'unread',
  },
  {
    id: '2',
    title: 'Driver license renewal ready',
    description: 'All required documents are available for your renewal application.',
    timestamp: 'Yesterday, 4:40 PM',
    status: 'unread',
  },
  {
    id: '3',
    title: 'Passport application update',
    description: 'Your application moved to department review.',
    timestamp: 'May 4, 2026',
    status: 'read',
  },
  {
    id: '4',
    title: 'Document wallet synced',
    description: 'Connect Gov refreshed your saved documents and application summary.',
    timestamp: 'May 3, 2026',
    status: 'read',
  },
];

export function getUnreadNotificationCount(
  notifications = mockNotifications,
) {
  return notifications.filter((notification) => notification.status === 'unread')
    .length;
}
