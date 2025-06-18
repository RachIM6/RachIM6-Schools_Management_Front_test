// --- START OF FILE: pages/teacher/TeacherDashboard.tsx ---
import { FC } from 'react';
import { useTeacher } from '@/context/TeacherContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { BookOpen, Users, Edit, UploadCloud, Calendar, Bell, FileText, CheckSquare, BarChart2 } from 'lucide-react';
import Link from 'next/link';

const mockDashboardData = {
    assignedModules: 3,
    totalStudents: 85,
    pendingGrades: 12,
    upcomingClasses: [
        { time: '14:00 - 16:00', course: 'Operating Systems', location: 'Amphi A' },
        { time: '10:00 - 12:00', course: 'Advanced Algorithms', location: 'Lab C10' },
    ],
    recentNotifications: [
        { text: "Admin approved your justification for absence on June 12.", time: "1h ago" },
        { text: "3 new student submissions for Project Alpha.", time: "5h ago" },
    ],
};

const QuickActionCard: FC<{ href: string; title: string; icon: React.ReactNode }> = ({ href, title, icon }) => (
    <Link href={href} className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 transition-colors">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">{icon}</div>
        <p className="ml-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</p>
    </Link>
);

export const TeacherDashboard: FC = () => {
    const { teacher } = useTeacher();
    if (!teacher) return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div></div>;

    return (
        <div className="space-y-8">
            <PageHeader
                title={`Welcome back, Prof. ${teacher.lastName}!`}
                description="Here's a summary of your activities and upcoming schedule."
            />
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center"><BookOpen className="h-8 w-8 text-blue-500 mr-4"/><div className="flex-1"><p className="text-sm text-gray-500">Assigned Modules</p><p className="text-2xl font-bold">{mockDashboardData.assignedModules}</p></div></div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center"><Users className="h-8 w-8 text-green-500 mr-4"/><div className="flex-1"><p className="text-sm text-gray-500">Total Students</p><p className="text-2xl font-bold">{mockDashboardData.totalStudents}</p></div></div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center"><Edit className="h-8 w-8 text-yellow-500 mr-4"/><div className="flex-1"><p className="text-sm text-gray-500">Pending Grades</p><p className="text-2xl font-bold">{mockDashboardData.pendingGrades}</p></div></div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center"><UploadCloud className="h-8 w-8 text-purple-500 mr-4"/><div className="flex-1"><p className="text-sm text-gray-500">Resources Uploaded</p><p className="text-2xl font-bold">27</p></div></div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Classes */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 flex items-center"><Calendar className="mr-2"/>Today's Schedule</h3>
                    <ul className="space-y-4">
                        {mockDashboardData.upcomingClasses.map(c => <li key={c.time} className="flex items-center"><span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">{c.time}</span><div className="ml-4"><p className="font-medium">{c.course}</p><p className="text-sm text-gray-500">{c.location}</p></div></li>)}
                         {mockDashboardData.upcomingClasses.length === 0 && <p className="text-sm text-gray-500">No more classes scheduled for today.</p>}
                    </ul>
                </div>
                {/* Quick Actions & Notifications */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                         <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                         <div className="space-y-3">
                            <QuickActionCard href="/teacher/grading" title="Enter Student Grades" icon={<BarChart2 className="h-5 w-5 text-blue-600"/>}/>
                            <QuickActionCard href="/teacher/attendance" title="Take Attendance" icon={<CheckSquare className="h-5 w-5 text-blue-600"/>}/>
                            <QuickActionCard href="/teacher/justifications" title="Submit Justification" icon={<FileText className="h-5 w-5 text-blue-600"/>}/>
                         </div>
                    </div>
                     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                         <h3 className="text-lg font-semibold mb-4 flex items-center"><Bell className="mr-2"/>Notifications</h3>
                         <ul className="space-y-3">{mockDashboardData.recentNotifications.map((n, i) => <li key={i} className="text-sm border-b dark:border-gray-700 pb-2"><p className="font-medium">{n.text}</p><p className="text-xs text-gray-500">{n.time}</p></li>)}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
// --- END OF FILE: pages/teacher/TeacherDashboard.tsx ---