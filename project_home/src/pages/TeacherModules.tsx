// --- START OF FILE: pages/teacher/TeacherModules.tsx ---
import { FC, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { BookOpen, Users, ChevronRight, CalendarDays, GraduationCap, Clock } from 'lucide-react';
import Link from 'next/link';
import { useTeacher } from '../context/TeacherContext';
import { 
  getModuleInstancesByTeacher, 
  getModuleById, 
  getSemesterById, 
  getAcademicYearById,
  getMajorById
} from '../data/academicData';

export const TeacherModules: FC = () => {
    const { teacher } = useTeacher();
    
    // Get teacher's modules across all semesters
    const teacherModules = useMemo(() => {
        if (!teacher?.keycloakId) return [];
        
        const instances = getModuleInstancesByTeacher(teacher.keycloakId);
        
        return instances.map(instance => {
            const module = getModuleById(instance.moduleId);
            const semester = getSemesterById(instance.semesterId);
            const academicYear = semester ? getAcademicYearById(semester.academicYearId) : null;
            const major = module ? getMajorById(module.majorId) : null;
            
            return {
                instanceId: instance.id,
                moduleName: module?.name || "Unknown Module",
                moduleCode: module?.code || "N/A",
                description: module?.description || "",
                majorName: major?.name || "Unknown Major",
                majorCode: major?.code || "N/A",
                semesterName: semester?.name || "N/A",
                academicYearName: academicYear?.name || "N/A",
                maxStudents: instance.maxStudents,
                currentStudents: instance.currentStudents,
                isActive: instance.isActive,
                credits: module?.credits || 0,
                prerequisites: module?.prerequisites || []
            };
        }).sort((a, b) => {
            // Sort by academic year (newest first), then by semester, then by module name
            const yearComparison = b.academicYearName.localeCompare(a.academicYearName);
            if (yearComparison !== 0) return yearComparison;
            
            const semesterComparison = a.semesterName.localeCompare(b.semesterName);
            if (semesterComparison !== 0) return semesterComparison;
            
            return a.moduleName.localeCompare(b.moduleName);
        });
    }, [teacher]);

    return (
        <div className="space-y-6">
            <PageHeader 
                title="My Modules" 
                description={`An overview of the modules you are assigned to teach.`} 
            />
            
            {teacherModules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teacherModules.map(mod => (
                        <Link 
                            key={mod.instanceId} 
                            href={`/teacher/modules/${mod.instanceId}`} 
                            className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <BookOpen className="h-8 w-8 text-blue-500"/>
                                <div className="text-right">
                                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                        {mod.moduleCode}
                                    </span>
                                    {mod.isActive && (
                                        <div className="mt-1">
                                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                                Active
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {mod.moduleName}
                                </h3>
                                
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {mod.majorName}
                                </p>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                    {mod.description}
                                </p>
                                
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center">
                                        <CalendarDays size={14} className="mr-1"/>
                                        {mod.academicYearName} - {mod.semesterName}
                                    </span>
                                    <span className="flex items-center">
                                        <GraduationCap size={14} className="mr-1"/>
                                        {mod.credits} Credits
                                    </span>
                                </div>
                                
                                {mod.prerequisites.length > 0 && (
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Prerequisites:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {mod.prerequisites.slice(0, 2).map((prereq, index) => (
                                                <span key={index} className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                                                    {prereq}
                                                </span>
                                            ))}
                                            {mod.prerequisites.length > 2 && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    +{mod.prerequisites.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 pt-3 border-t dark:border-gray-700">
                                    <span className="flex items-center">
                                        <Users size={16} className="mr-2"/>
                                        {mod.currentStudents}/{mod.maxStudents} Students
                                    </span>
                                    <span className="flex items-center font-semibold text-blue-600 dark:text-blue-400">
                                        View Details 
                                        <ChevronRight size={16} className="ml-1"/>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400"/>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No Modules Assigned</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        You haven't been assigned to teach any modules yet.
                    </p>
                </div>
            )}
        </div>
    );
};
// --- END OF FILE: pages/teacher/TeacherModules.tsx ---