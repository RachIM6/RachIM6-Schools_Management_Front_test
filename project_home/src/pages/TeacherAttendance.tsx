// --- START OF FILE: pages/teacher/TeacherAttendance.tsx ---

import { FC, useState, useMemo, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useTeacher } from "@/context/TeacherContext";
import {
  Check,
  X,
  Clock,
  AlertTriangle,
  BookOpen,
  Calendar,
  Save,
  CheckSquare,
  Users,
  Eye,
  FileText,
} from "lucide-react";
import { 
  getModuleInstancesByTeacher,
  getModuleById,
  getMajorById,
  getSemesterById,
  getAcademicYearById,
  semesters
} from '@/data/academicData';
import { 
  attendanceStorage, 
  type StudentAttendanceRecord, 
  type AttendanceSession,
  type AttendanceStatus 
} from '@/data/attendanceStorage';

// Define the shape of a scheduled session
type ScheduledSession = {
  id: string;
  date: string;
  time: string;
  weekNumber: number;
  weekLabel: string;
};

// Mock student list - in real app this would come from the database
const mockStudentListForSession: Omit<StudentAttendanceRecord, 'status'>[] = [
  { id: "student-1", name: "Rachid IMOURIGUE" },
  { id: "student-2", name: "Mohamed HAJJI" },
  { id: "student-3", name: "Ayoub Marghad" },
  { id: "student-4", name: "Fatima Zahra" },
  { id: "student-5", name: "Yassine Alami" },
  { id: "student-6", name: "Laila Bensouda" },
  { id: "student-7", name: "Karim Idrissi" },
  { id: "student-8", name: "Nadia Tazi" },
  { id: "student-9", name: "Omar Benjelloun" },
  { id: "student-10", name: "Salma Bakkali" },
  { id: "student-11", name: "Mehdi Chraibi" },
  { id: "student-12", name: "Amina Fassi" },
  { id: "student-13", name: "Younes Berrada" },
  { id: "student-14", name: "Hajar Mansouri" },
  { id: "student-15", name: "Zakaria Bouali" },
  { id: "student-16", name: "Soukaina Alaoui" },
  { id: "student-17", name: "Hamza Bennani" },
  { id: "student-18", name: "Imane Chaoui" },
  { id: "student-19", name: "Youssef Lahrichi" },
  { id: "student-20", name: "Zineb Moussaoui" },
  { id: "student-21", name: "Adil Tahiri" },
  { id: "student-22", name: "Houda Ziani" },
  { id: "student-23", name: "Khalid Ouazzani" },
  { id: "student-24", name: "Samira Doukkali" },
  { id: "student-25", name: "Tarik El Amrani" },
];

// Generate scheduled sessions for a module
const generateScheduledSessions = (moduleId: string, semesterId: string): ScheduledSession[] => {
  const semester = getSemesterById(semesterId);
  if (!semester) return [];

  const academicYear = getAcademicYearById(semester.academicYearId);
  if (!academicYear) return [];

  const module = getModuleById(moduleId);
  if (!module) return [];

  const sessions: ScheduledSession[] = [];
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
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 4);
    
    const weekNumber = week + 1;
    const fromDate = weekStart.toLocaleDateString('en-US', { month: 'short' });
    const toDate = weekEnd.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const weekLabel = `Week ${weekNumber.toString().padStart(2, '0')} : ${fromDate} - ${toDate}`;

    // Use Monday as the class day
    const classDate = new Date(weekStart);
    classDate.setDate(weekStart.getDate() + 0); // Monday

    sessions.push({
      id: `${moduleId}-week-${weekNumber}`,
      date: classDate.toISOString().split('T')[0],
      time: `${startTime.toString().padStart(2, '0')}:00`,
      weekNumber,
      weekLabel
    });
  }

  return sessions;
};

export const TeacherAttendance: FC = () => {
  const { teacher } = useTeacher();
  const [selectedModuleInstance, setSelectedModuleInstance] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [students, setStudents] = useState<StudentAttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Get available modules with major information
  const availableModules = useMemo(() => {
    return currentModuleInstances.map(instance => {
      const module = getModuleById(instance.moduleId);
      const major = module ? getMajorById(module.majorId) : null;
      return {
        id: instance.id,
        moduleId: instance.moduleId,
        moduleName: module?.name || 'Unknown Module',
        moduleCode: module?.code || 'Unknown',
        majorName: major?.name || 'Unknown Major',
        majorCode: major?.code || 'Unknown',
        semesterId: instance.semesterId,
        isActive: instance.isActive
      };
    });
  }, [currentModuleInstances]);

  // Get scheduled sessions for selected module
  const availableSessions = useMemo(() => {
    if (!selectedModuleInstance) return [];
    const instance = currentModuleInstances.find(inst => inst.id === selectedModuleInstance);
    if (!instance) return [];
    
    return generateScheduledSessions(instance.moduleId, instance.semesterId);
  }, [selectedModuleInstance, currentModuleInstances]);

  // Get current week (default selection)
  const currentWeek = useMemo(() => {
    if (availableSessions.length === 0) return null;
    // For demo purposes, select week 3 as current
    return availableSessions.find(session => session.weekNumber === 3) || availableSessions[0];
  }, [availableSessions]);

  // Auto-select current week when sessions are loaded
  useEffect(() => {
    if (currentWeek && !selectedWeek) {
      setSelectedWeek(currentWeek.id);
    }
  }, [currentWeek, selectedWeek]);

  const handleModuleChange = (moduleInstanceId: string) => {
    setSelectedModuleInstance(moduleInstanceId);
    setSelectedWeek(""); // Reset week selection
    setStudents([]); // Clear students
    setIsSubmitted(false);
  };

  const handleWeekChange = (sessionId: string) => {
    setSelectedWeek(sessionId);
    setStudents([]); // Clear students
    setIsSubmitted(false);
  };

  const handleSessionSelect = () => {
    if (selectedModuleInstance && selectedWeek) {
      setIsLoading(true);
      
      // Check if we have stored data for this session
      const storedSession = attendanceStorage.getSession(selectedModuleInstance, selectedWeek);
      
      if (storedSession) {
        // Load existing data
        setStudents(storedSession.students);
        setIsSubmitted(!!storedSession.submittedAt);
      } else {
        // Load fresh student list with no default status
        const freshStudents = mockStudentListForSession.map(student => ({
          ...student,
          status: undefined // No default value - no option selected
        }));
        setStudents(freshStudents);
        setIsSubmitted(false);
      }
      
      setIsLoading(false);
    }
  };

  const setStudentStatus = (
    studentId: string,
    status: AttendanceStatus
  ) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
  };

  const markAllAsPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: "PRESENT" })));
  };

  const handleSubmitAttendance = () => {
    if (!selectedModuleInstance || !selectedWeek || students.length === 0) return;

    // Check if all students have a status
    const studentsWithoutStatus = students.filter(student => !student.status);
    if (studentsWithoutStatus.length > 0) {
      alert(`Please mark attendance for all students. ${studentsWithoutStatus.length} student(s) still need attendance marked.`);
      return;
    }

    const selectedSessionData = availableSessions.find(s => s.id === selectedWeek);
    if (!selectedSessionData) return;

    // Create attendance session
    const attendanceSession: AttendanceSession = {
      moduleInstanceId: selectedModuleInstance,
      weekId: selectedWeek,
      date: selectedSessionData.date,
      time: selectedSessionData.time,
      weekNumber: selectedSessionData.weekNumber,
      weekLabel: selectedSessionData.weekLabel,
      students: students as StudentAttendanceRecord[], // All students now have status
      submittedAt: new Date().toISOString(),
      submittedBy: teacher?.keycloakId || 'unknown'
    };

    // Save to storage
    attendanceStorage.saveSession(attendanceSession);
    setIsSubmitted(true);
    
    console.log("Attendance sheet saved:", attendanceSession);
    alert("Attendance sheet has been saved successfully!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const selectedModuleData = availableModules.find(m => m.id === selectedModuleInstance);
  const selectedSessionData = availableSessions.find(s => s.id === selectedWeek);

  // Show loading if teacher is not loaded
  if (!teacher) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Take Attendance"
        description="Select a class session and mark student attendance."
      />

      {/* --- Session Selection Panel --- */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Select a Session
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Module Selection */}
          <div>
            <label
              htmlFor="module-select"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Current Teaching Module
            </label>
            <select
              id="module-select"
              value={selectedModuleInstance}
              onChange={(e) => handleModuleChange(e.target.value)}
              className="w-full input-style"
            >
              <option value="">-- Choose a module --</option>
              {availableModules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.moduleName} ({module.majorName})
                </option>
              ))}
            </select>
          </div>

          {/* Week Selection */}
          <div>
            <label
              htmlFor="session-select"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Week
            </label>
            <select
              id="session-select"
              value={selectedWeek}
              onChange={(e) => handleWeekChange(e.target.value)}
              disabled={!selectedModuleInstance}
              className="w-full input-style disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {selectedModuleInstance ? "-- Choose a week --" : "Select module first"}
              </option>
              {availableSessions.map((session) => {
                const hasStoredData = attendanceStorage.hasSession(selectedModuleInstance, session.id);
                const storedSession = attendanceStorage.getSession(selectedModuleInstance, session.id);
                const isSubmitted = storedSession?.submittedAt;
                
                return (
                  <option key={session.id} value={session.id}>
                    {session.weekLabel}
                    {hasStoredData && (
                      isSubmitted ? " ✓" : " (Draft)"
                    )}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            onClick={handleSessionSelect}
            disabled={!selectedModuleInstance || !selectedWeek || isLoading}
            className="btn-primary md:w-auto w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Load Student List"}
          </button>
        </div>
      </div>

      {/* --- Attendance Marking Sheet --- */}
      {students.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4 border-b dark:border-gray-700 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Attendance for{" "}
                {selectedModuleData?.moduleName} -{" "}
                {selectedSessionData && (
                  <>
                    {selectedSessionData.weekLabel}
                  </>
                )}
              </h3>
              {isSubmitted && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full flex items-center gap-1">
                  <FileText size={12} />
                  Submitted
                </span>
              )}
            </div>
            {!isSubmitted && (
              <button
                onClick={markAllAsPresent}
                className="btn-secondary text-xs"
              >
                <CheckSquare size={14} className="mr-2" /> Mark All as Present
              </button>
            )}
          </div>
          <ul className="divide-y dark:divide-gray-700 max-h-[60vh] overflow-y-auto">
            {students.map((student) => (
              <li
                key={student.id}
                className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {student.name}
                </span>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  {[
                    {
                      label: "Present",
                      status: "PRESENT" as AttendanceStatus,
                      icon: <Check size={14} />,
                      colors:
                        "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-200",
                      active: "bg-green-500 text-white",
                      disabled: "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500",
                    },
                    {
                      label: "Absent",
                      status: "ABSENT" as AttendanceStatus,
                      icon: <X size={14} />,
                      colors:
                        "bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-200",
                      active: "bg-red-500 text-white",
                      disabled: "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500",
                    },
                    {
                      label: "Late",
                      status: "LATE" as AttendanceStatus,
                      icon: <Clock size={14} />,
                      colors:
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-200",
                      active: "bg-yellow-500 text-white",
                      disabled: "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500",
                    },
                    {
                      label: "Excused",
                      status: "EXCUSED" as AttendanceStatus,
                      icon: <AlertTriangle size={14} />,
                      colors:
                        "bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-200",
                      active: "bg-blue-500 text-white",
                      disabled: "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500",
                    },
                  ].map((item) => (
                    <button
                      key={item.status}
                      onClick={() =>
                        setStudentStatus(student.id, item.status)
                      }
                      disabled={isSubmitted}
                      className={`flex items-center px-3 py-1.5 text-xs rounded-full transition-all ${
                        student.status === item.status
                          ? `${item.active} font-bold shadow-md`
                          : `${item.disabled} cursor-pointer hover:opacity-80`
                      } ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {item.icon}{" "}
                      <span className="ml-1.5 hidden sm:inline">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          {!isSubmitted && (
            <div className="p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {(() => {
                  const studentsWithoutStatus = students.filter(student => !student.status);
                  if (studentsWithoutStatus.length > 0) {
                    return (
                      <span className="text-orange-600 dark:text-orange-400">
                        ⚠️ {studentsWithoutStatus.length} student(s) need attendance marked
                      </span>
                    );
                  }
                  return (
                    <span className="text-green-600 dark:text-green-400">
                      ✓ All students marked
                    </span>
                  );
                })()}
              </div>
              <button 
                onClick={handleSubmitAttendance} 
                disabled={students.some(student => !student.status)}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} className="mr-2" />
                Save Attendance Sheet
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            No Session Selected
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a module and session above to load the student list.
          </p>
        </div>
      )}
      <style jsx>{`
        .input-style {
          display: block;
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          background-color: white;
          color: #374151;
        }
        .dark .input-style {
          background-color: #374151;
          border-color: #4b5563;
          color: #fff;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border: 1px solid transparent;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          background-color: #2563eb;
          cursor: pointer;
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          background-color: white;
          cursor: pointer;
        }
        .dark .btn-secondary {
          background-color: #374151;
          color: #f9fafb;
          border-color: #4b5563;
        }
      `}</style>
    </div>
  );
};
// --- END OF FILE: pages/teacher/TeacherAttendance.tsx ---
