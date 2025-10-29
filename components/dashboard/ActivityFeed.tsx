
import React from 'react';
import type { Activity } from '../../types';

const mockActivities: Activity[] = [
  {
    id: 'a1',
    user: { name: 'Sarah Lee', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
    action: 'approved',
    target: 'MSA with Innovate Inc.',
    timestamp: '2 hours ago',
  },
  {
    id: 'a2',
    user: { name: 'John Doe', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
    action: 'uploaded a new version of',
    target: 'NDA with ClientX',
    timestamp: '5 hours ago',
  },
  {
    id: 'a3',
    user: { name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    action: 'sent for signature',
    target: 'Partnership Agreement',
    timestamp: '1 day ago',
  },
   {
    id: 'a4',
    user: { name: 'Emily White', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    action: 'rejected',
    target: 'SaaS Subscription - Acme',
    timestamp: '2 days ago',
  },
];

const ActivityFeed: React.FC = () => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {mockActivities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== mockActivities.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-center">
                    <img className="h-full w-full rounded-full object-cover" src={activity.user.avatarUrl} alt="" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{activity.user.name}</span> {activity.action}{' '}
                      <span className="font-medium text-gray-900">{activity.target}</span>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time>{activity.timestamp}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
