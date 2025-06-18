// --- START OF FILE: pages/StudentDashboard.tsx ---

import { FC, useState, Fragment } from "react";
import {
  User,
  Calendar,
  BookOpen,
  CheckSquare,
  FileText,
  Bell,
  BarChart2,
  School,
} from "lucide-react";
import { useStudent } from "../context/StudentContext";
import { PageHeader } from "../components/ui/PageHeader";
import { NewRequestModal } from "../components/ui/NewRequestModal";
import Link from "next/link";
import { Popover, Transition } from '@headlessui/react';

const mockRequests = [
  { id: 1, type: "Demander un relevé de notes", status: "Approved", date: "2024-05-20" },
  { id: 2, type: "Envoyer un justificatif d'absence", status: "Pending", date: "2024-05-28" },
  { id: 3, type: "Demander une attestation de scolarité", status: "Rejected", date: "2024-05-15" },
];

const mockNotifications = [
    { text: "Your grade for CS301 has been published.", time: "2 hours ago" },
    { text: "New announcement: Final exam schedule is available.", time: "1 day ago" },
    { text: "Your request for a transcript was approved.", time: "3 days ago" },
];

const getStatusChip = (status: string) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'Rejected':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
}

export const StudentDashboard: FC = () => {
  const { student } = useStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!student) {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <NewRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <PageHeader
        title={`Welcome, ${student.firstName}!`}
        description="This is your personal portal. Access your academic information and services here."
      />

      {/* --- NEW SECTION: Prominent Program Title --- */}
      <div className="text-center -mt-4">
        <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 font-bold px-4 py-2 text-[30px] rounded-full">
            <School className="mr-2 h-10 w-10"/>
            <span>{student.filiereName || 'Not Enrolled in a Program'}</span>
        </div>
      </div>


      {/* Profile & Academic Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-4">
            <User className="mr-2 h-5 w-5 text-blue-500" />
            Profile Summary
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Full Name</dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">{`${student.firstName} ${student.lastName}`}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Email</dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">{student.email}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Academic Year</dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">{student.scholarYear ? `Year ${student.scholarYear}` : 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Status</dt>
              <dd className="font-medium text-green-600 dark:text-green-400">{student.academicStatus || 'N/A'}</dd>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col justify-center items-center">
             <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Overall Progress</h3>
             <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">50%</div>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Completion this semester</p>
        </div>
      </div>

      {/* Quick Actions with functional Notifications */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <QuickActionCard icon={<Calendar size={24} />} title="My Schedule" href="/student/schedule" />
        <QuickActionCard icon={<BookOpen size={24} />} title="My Modules" href="/student/modules" />
        <QuickActionCard icon={<BarChart2 size={24} />} title="My Grades" href="/student/grades" />
        <QuickActionCard icon={<CheckSquare size={24} />} title="My Attendance" href="/student/attendance" />
        <NotificationBell />
      </div>

      {/* Administrative Requests */}
       <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Administrative Requests
            </h3>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Make a New Request
            </button>
        </div>
        <div className="p-6">
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Requests</h4>
            <ul className="space-y-3">
                {mockRequests.map(req => (
                    <li key={req.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                        <div>
                            <p className="font-medium text-sm text-gray-800 dark:text-gray-200">{req.type}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Submitted on: {req.date}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusChip(req.status)}`}>
                            {req.status}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
       </div>
    </div>
  );
};

// --- (NotificationBell and QuickActionCard components remain the same as before) ---
const NotificationBell = () => (
    <Popover className="relative">
        <Popover.Button className="relative block w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200 focus:outline-none">
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</div>
            <div className="text-blue-500 dark:text-blue-400 mb-2 inline-block"><Bell size={24} /></div>
            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Notifications</h4>
        </Popover.Button>
        <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
            <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-xs -right-1/2 left-1/2 -translate-x-1/2">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white dark:bg-gray-800 p-4">
                        <h4 className="font-bold mb-2 px-3">Notifications</h4>
                        <div className="grid gap-1">
                            {mockNotifications.map(item => (
                                <a key={item.text} href="#" className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.text}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Popover.Panel>
        </Transition>
    </Popover>
);

interface QuickActionCardProps {
    icon: React.ReactNode;
    title: string;
    href: string;
}
const QuickActionCard: FC<QuickActionCardProps> = ({ icon, title, href }) => (
    <Link href={href} className="relative block bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
        <div className="text-blue-500 dark:text-blue-400 mb-2 inline-block">{icon}</div>
        <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{title}</h4>
    </Link>
);
// --- END OF FILE: pages/StudentDashboard.tsx ---