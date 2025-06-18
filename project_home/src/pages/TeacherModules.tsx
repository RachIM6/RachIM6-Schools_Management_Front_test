// --- START OF FILE: pages/teacher/TeacherModules.tsx ---
import { FC } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { BookOpen, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const mockModules = [
    { title: "Advanced Algorithms", code: "CS301", students: 30, filiere: "Computer Science Engineering" },
    { title: "Operating Systems", code: "CS305", students: 35, filiere: "Computer Science Engineering" },
    { title: "Quantum Physics", code: "PH210", students: 20, filiere: "Applied Physics" },
];

export const TeacherModules: FC = () => {
    return (
        <div className="space-y-6">
            <PageHeader title="My Modules" description="An overview of the modules you are assigned to teach." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockModules.map(mod => (
                    <Link key={mod.code} href={`/teacher/modules/${mod.code}`} className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <BookOpen className="h-8 w-8 text-blue-500"/>
                            <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{mod.code}</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{mod.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{mod.filiere}</p>
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mt-4 pt-4 border-t dark:border-gray-700">
                                <span className="flex items-center"><Users size={16} className="mr-2"/>{mod.students} Students</span>
                                <span className="flex items-center font-semibold text-blue-600 dark:text-blue-400">View Details <ChevronRight size={16} className="ml-1"/></span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
// --- END OF FILE: pages/teacher/TeacherModules.tsx ---