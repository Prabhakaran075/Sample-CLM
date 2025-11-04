
import React from 'react';
import type { Activity } from '../../types';
import { CheckCircleIcon, XCircleIcon, InfoCircleIcon, UploadCloudIcon, PaperAirplaneIcon, EyeIcon, PencilSquareIcon } from '../icons/IconComponents';

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

const actionIcons: { [key: string]: { Icon: React.FC<{className?: string}>, color: string } } = {
  'approved': { Icon: CheckCircleIcon, color: 'bg-green-500' },
  'uploaded': { Icon: UploadCloudIcon, color: 'bg-blue-500' },
  'sent': { Icon: PaperAirplaneIcon, color: 'bg-indigo-500' },
  'rejected': { Icon: XCircleIcon, color: 'bg-red-500' },
};


const ActivityFeed: React.FC = () => {
  return (
    <div>
        <div className="mb-4 p-3 bg-primary-50 border-l-4 border-primary-400 rounded-r-lg">
            <p className="text-sm text-primary-800"><span className="font-bold">AI Summary:</span> 2 contracts are pending your review with an average delay of 1.3 days.</p>
        </div>
        <div className="flow-root">
        <ul role="list" className="-mb-8">
            {mockActivities.map((activity, activityIdx) => {
            const actionWord = activity.action.split(' ')[0];
            const { Icon, color } = actionIcons[actionWord] || { Icon: InfoCircleIcon, color: 'bg-gray-400' };

            return (
            <li key={activity.id}>
                <div className="relative pb-8 group">
                {activityIdx !== mockActivities.length - 1 ? (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-start space-x-3">
                    <div className="relative">
                        <img className="h-10 w-10 rounded-full object-cover ring-2 ring-white" src={activity.user.avatarUrl} alt="" />
                        <span className={`absolute -bottom-1 -right-1 rounded-full p-0.5 ${color}`}>
                            <Icon className="h-4 w-4 text-white" />
                        </span>
                    </div>
                    <div className="min-w-0 flex-1">
                    <div>
                        <div className="text-sm">
                        <a href="#" className="font-medium text-gray-900">{activity.user.name}</a>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                        {activity.action} <span className="font-medium text-gray-700">{activity.target}</span>
                        </p>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                        <time>{activity.timestamp}</time>
                    </div>
                    </div>
                     <div className="absolute right-0 top-0 hidden group-hover:flex items-center space-x-1 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-full"><EyeIcon className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-full"><PencilSquareIcon className="w-4 h-4" /></button>
                    </div>
                </div>
                </div>
            </li>
            );
            })}
        </ul>
        </div>
    </div>
  );
};

export default ActivityFeed;
