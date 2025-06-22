// --- START OF FILE: pages/StudentModules.tsx ---

import { FC, useState, useMemo, Fragment } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { BookOpen, Star, Clock, ChevronDown, CalendarDays, Book, GraduationCap, Users } from "lucide-react";
import { Disclosure, Transition } from "@headlessui/react";
import { useStudent } from "../context/StudentContext";
import { 
  academicYears, 
  semesters, 
  getModuleInstancesByStudentMajor, 
  getModuleById, 
  getTeacherById,
  getMajorById,
  getSemesterById,
  getAcademicYearById
} from "../data/academicData";
import { getMajorFromFiliereName } from "../utils/majorMapping";

// Mock student grades for completed modules
const mockStudentGrades: Record<string, number> = {
  "inst-2023-s1-ma201": 18,
  "inst-2023-s1-eth101": 19,
  "inst-2023-s1-ph101": 16,
  "inst-2023-s2-cs201": 17,
  "inst-2023-s2-ma202": 15,
  "inst-2024-s1-cs202": 16,
  "inst-2024-s1-ma101": 14,
  "inst-2024-s1-cs401": 17, // Mr. TABAA's Software Engineering module (CS major)
};

export const StudentModules: FC = () => {
  const { student } = useStudent();
  const [activeSelection, setActiveSelection] = useState<{ yearId: string | null; semesterId: string | null }>({ 
    yearId: null, 
    semesterId: null 
  });
  
  // Get student's major from their filiere name
  const studentMajor = useMemo(() => {
    if (!student?.filiereName) return null;
    return getMajorFromFiliereName(student.filiereName);
  }, [student?.filiereName]);

  // Get available academic years and semesters
  const availableYears = useMemo(() => {
    return academicYears.sort((a, b) => b.name.localeCompare(a.name));
  }, []);

  const availableSemesters = useMemo(() => {
    if (!activeSelection.yearId) return [];
    return semesters
      .filter(sem => sem.academicYearId === activeSelection.yearId)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [activeSelection.yearId]);

  // Get modules for the selected semester and student's major
  const displayedModules = useMemo(() => {
    if (!activeSelection.semesterId || !studentMajor) return [];

    const moduleInstances = getModuleInstancesByStudentMajor(studentMajor.id, activeSelection.semesterId);
    
    return moduleInstances.map(instance => {
      const module = getModuleById(instance.moduleId);
      const teacher = getTeacherById(instance.teacherId);
      const semester = getSemesterById(instance.semesterId);
      const academicYear = semester ? getAcademicYearById(semester.academicYearId) : null;
      
      const isCompleted = semester && !semester.isActive;
      const grade = mockStudentGrades[instance.id];
      
      return {
        instanceId: instance.id,
        moduleName: module?.name || "Unknown Module",
        moduleCode: module?.code || "N/A",
        description: module?.description || "",
        teacher: teacher ? `${teacher.firstName} ${teacher.lastName}` : "TBD",
        credits: module?.credits || 0,
        maxStudents: instance.maxStudents,
        currentStudents: instance.currentStudents,
        isCompleted,
        grade,
        isActive: instance.isActive,
        prerequisites: module?.prerequisites || []
      };
    }).sort((a, b) => {
      // Sort completed modules by grade (highest first), then active modules
      if (a.isCompleted && b.isCompleted) {
        return (b.grade || 0) - (a.grade || 0);
      }
      if (a.isCompleted && !b.isCompleted) return -1;
      if (!a.isCompleted && b.isCompleted) return 1;
      return a.moduleName.localeCompare(b.moduleName);
    });
  }, [activeSelection.semesterId, studentMajor]);

  return (
    <div className="space-y-8">
      <PageHeader 
        title="My Modules" 
        description={`Browse your enrolled courses for ${studentMajor?.name || 'your major'} and review your performance.`} 
      />
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {availableYears.map((year, index) => (
            <Disclosure as="div" key={year.id}>
              {({ open }) => (
                <div className={index > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-md font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span className="flex items-center">
                        <CalendarDays className="h-5 w-5 text-blue-500 mr-3"/>
                        Academic Year {year.name}
                        {year.isActive && (
                          <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                            Current
                          </span>
                        )}
                    </span>
                    <ChevronDown className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-blue-500 transition-transform`} />
                  </Disclosure.Button>
                  <Transition
                     as={Fragment}
                     enter="transition duration-100 ease-out"
                     enterFrom="transform -translate-y-2 opacity-0"
                     enterTo="transform translate-y-0 opacity-100"
                     leave="transition duration-75 ease-out"
                     leaveFrom="transform translate-y-0 opacity-100"
                     leaveTo="transform -translate-y-2 opacity-0"
                  >
                    <Disclosure.Panel className="px-6 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <div className="space-y-2">
                           {semesters
                             .filter(sem => sem.academicYearId === year.id)
                             .sort((a, b) => a.name.localeCompare(b.name))
                             .map(semester => (
                                <button
                                    key={semester.id}
                                    onClick={() => setActiveSelection({ 
                                      yearId: year.id, 
                                      semesterId: semester.id 
                                    })}
                                    className={`w-full flex items-center justify-between text-left p-3 rounded-lg transition-colors ${
                                      activeSelection.yearId === year.id && activeSelection.semesterId === semester.id
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <div className="flex items-center">
                                      <Book className="h-5 w-5 mr-3"/>
                                      Semester {semester.name.substring(1)}
                                    </div>
                                    {semester.isActive && (
                                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                        Active
                                      </span>
                                    )}
                                </button>
                           ))}
                        </div>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>

      {/* Display selected modules */}
      {displayedModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedModules.map((mod) => {
            const progress = mod.isCompleted ? 100 : 75; // Mock progress for active modules
            return (
              <div key={mod.instanceId} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{mod.moduleName}</h3>
                    </div>
                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {mod.moduleCode}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Taught by: <span className="font-medium">{mod.teacher}</span>
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{mod.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span className="flex items-center">
                      <GraduationCap size={14} className="mr-1"/>
                      {mod.credits} Credits
                    </span>
                    <span className="flex items-center">
                      <Users size={14} className="mr-1"/>
                      {mod.currentStudents}/{mod.maxStudents} Students
                    </span>
                  </div>
                  
                  {mod.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Prerequisites:</p>
                      <div className="flex flex-wrap gap-1">
                        {mod.prerequisites.map((prereq, index) => (
                          <span key={index} className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-auto space-y-4">
                  {mod.isCompleted && mod.grade && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/50 rounded-md">
                      <div className="flex items-center text-blue-700 dark:text-blue-300">
                        <Star size={16} className="mr-2"/>
                        <span className="font-semibold text-sm">Final Score</span>
                      </div>
                      <span className="font-bold text-lg text-blue-800 dark:text-blue-200">{mod.grade}/20</span>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1"/> 
                        Progress
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${progress}%`, 
                          backgroundColor: progress === 100 ? '#16a34a' : '#2563eb' 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : activeSelection.semesterId ? (
        <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400"/>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No Modules Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No modules are available for your major in the selected semester.
          </p>
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400"/>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Awaiting Selection</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select an academic year and semester above to view your modules.
          </p>
        </div>
      )}
    </div>
  );
};
// --- END OF FILE: pages/StudentModules.tsx ---