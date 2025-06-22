// --- START OF FILE: pages/teacher/TeacherDashboard.tsx ---
import { FC, useMemo } from 'react';
import { useTeacher } from '@/context/TeacherContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { BookOpen, Users, Edit, Calendar, Bell, FileText, CheckSquare, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { 
  getModuleInstancesByTeacher,
  getModuleById,
  getMajorById,
  getSemesterById,
  getAcademicYearById,
  semesters
} from '@/data/academicData';

// Generate scheduled sessions for a module
const generateScheduledSessions = (moduleId: string, semesterId: string) => {
  const semester = getSemesterById(semesterId);
  if (!semester) return [];

  const academicYear = getAcademicYearById(semester.academicYearId);
  if (!academicYear) return [];

  const module = getModuleById(moduleId);
  if (!module) return [];

  const sessions: Array<{
    date: Date;
    time: string;
    endTime: string;
    moduleName: string;
    moduleCode: string;
    location: string;
    weekNumber: number;
  }> = [];
  const numWeeks = 14;
  
  // Calculate start date based on semester
  const year = parseInt(academicYear.name.split('-')[semester.name === 'S1' ? 0 : 1]);
  const startDate = new Date(semester.name === 'S1' ? `${year}-09-02` : `${year}-02-03`);

  // Fixed time slots based on module code for consistency
  const timeSlots = [9, 11, 13, 15, 17];
  const timeIndex = module.code.charCodeAt(module.code.length - 1) % timeSlots.length;
  const startTime = timeSlots[timeIndex];

  for (let week = 0; week < numWeeks; week++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + (week * 7));
    
    // Use Monday as the class day
    const classDate = new Date(weekStart);
    classDate.setDate(weekStart.getDate() + 0); // Monday

    sessions.push({
      date: classDate,
      time: `${startTime.toString().padStart(2, '0')}:00`,
      endTime: `${(startTime + 2).toString().padStart(2, '0')}:00`,
      moduleName: module.name,
      moduleCode: module.code,
      location: `Room ${module.code}${startTime}`,
      weekNumber: week + 1
    });
  }

  return sessions;
};

const mockDashboardData = {
    assignedModules: 4,
    totalStudents: 120,
    pendingGrades: 8,
    recentNotifications: [
        { text: "Admin approved your justification for absence on May 15.", time: "2h ago" },
        { text: "5 new student submissions for Project Alpha.", time: "4h ago" },
        { text: "Attendance reminder: Class starts in 30 minutes.", time: "1h ago" },
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

    // Get teacher's module instances
    const teacherModuleInstances = useMemo(() => {
        if (!teacher) return [];
        return getModuleInstancesByTeacher(teacher.keycloakId);
    }, [teacher]);

    // Get current semester
    const currentSemester = useMemo(() => {
        return semesters.find(semester => semester.isActive);
    }, []);

    // Filter module instances for current semester
    const currentModuleInstances = useMemo(() => {
        if (!currentSemester) return [];
        return teacherModuleInstances.filter(instance => instance.semesterId === currentSemester.id);
    }, [teacherModuleInstances, currentSemester]);

    // Generate all scheduled sessions for current semester
    const allScheduledSessions = useMemo(() => {
        const sessions: Array<{
            date: Date;
            time: string;
            endTime: string;
            moduleName: string;
            moduleCode: string;
            location: string;
            weekNumber: number;
        }> = [];
        currentModuleInstances.forEach(instance => {
            const moduleSessions = generateScheduledSessions(instance.moduleId, instance.semesterId);
            sessions.push(...moduleSessions);
        });
        return sessions;
    }, [currentModuleInstances]);

    // Get today's schedule
    const todaysSchedule = useMemo(() => {
        const today = new Date();
        const todayString = today.toDateString();
        
        return allScheduledSessions
            .filter(session => session.date.toDateString() === todayString)
            .sort((a, b) => a.time.localeCompare(b.time))
            .map(session => ({
                time: `${session.time} - ${session.endTime}`,
                course: session.moduleName,
                location: session.location,
                moduleCode: session.moduleCode
            }));
    }, [allScheduledSessions]);

    // Calculate dashboard stats
    const dashboardStats = useMemo(() => {
        return {
            assignedModules: currentModuleInstances.length,
            totalStudents: currentModuleInstances.length * 25, // Assuming 25 students per module
            pendingGrades: currentModuleInstances.length * 2, // Assuming 2 pending grades per module
        };
    }, [currentModuleInstances]);

    if (!teacher) return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div></div>;

    return (
        <div className="space-y-8">
            <PageHeader
                title={`Welcome back, Prof. ${teacher.lastName}!`}
                description="Here's a summary of your activities and upcoming schedule."
            />
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center"><BookOpen className="h-8 w-8 text-blue-500 mr-4"/><div className="flex-1"><p className="text-sm text-gray-500">Assigned Modules</p><p className="text-2xl font-bold">{dashboardStats.assignedModules}</p></div></div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center"><Users className="h-8 w-8 text-green-500 mr-4"/><div className="flex-1"><p className="text-sm text-gray-500">Total Students</p><p className="text-2xl font-bold">{dashboardStats.totalStudents}</p></div></div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center"><Edit className="h-8 w-8 text-yellow-500 mr-4"/><div className="flex-1"><p className="text-sm text-gray-500">Pending Grades</p><p className="text-2xl font-bold">{dashboardStats.pendingGrades}</p></div></div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Classes */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Calendar className="mr-2"/>
                        Today's Schedule
                        <span className="ml-2 text-sm text-gray-500">
                            ({new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })})
                        </span>
                    </h3>
                    <ul className="space-y-4">
                        {todaysSchedule.length > 0 ? (
                            todaysSchedule.map((session, index) => (
                                <li key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="font-mono text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-md">
                                        {session.time}
                                    </span>
                                    <div className="ml-4 flex-1">
                                        <p className="font-medium text-gray-800 dark:text-gray-200">
                                            {session.course}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {session.location} • {session.moduleCode}
                                        </p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-500 dark:text-gray-400">
                                    No classes scheduled for today.
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                    Enjoy your day off!
                                </p>
                            </div>
                        )}
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