// --- START OF FILE: pages/teacher/TeacherAttendance.tsx ---

import { FC, useState, useMemo } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
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
} from "lucide-react";

// Define the shape of a student's attendance record for state management
type StudentAttendanceRecord = {
  id: string;
  name: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
};

// Define the shape of a scheduled session
type ScheduledSession = {
  id: string;
  date: string;
  time: string;
  weekNumber: number;
};

// Mock data for majors and their modules
const majors = [
  { id: "CS", name: "Computer Science" },
  { id: "ENG", name: "Engineering" },
  { id: "BUS", name: "Business" },
  { id: "PH", name: "Physics" },
];

const modulesByMajor = {
  CS: [
    { id: "CS301", name: "Advanced Algorithms" },
    { id: "CS305", name: "Operating Systems" },
    { id: "CS302", name: "Database Systems" },
    { id: "CS303", name: "Software Engineering" },
  ],
  ENG: [
    { id: "ENG201", name: "Mechanical Engineering" },
    { id: "ENG202", name: "Electrical Engineering" },
    { id: "ENG203", name: "Civil Engineering" },
  ],
  BUS: [
    { id: "BUS101", name: "Business Management" },
    { id: "BUS102", name: "Marketing" },
    { id: "BUS103", name: "Finance" },
  ],
  PH: [
    { id: "PH210", name: "Quantum Physics" },
    { id: "PH211", name: "Classical Mechanics" },
    { id: "PH212", name: "Thermodynamics" },
  ],
};

// Mock scheduled sessions organized by week
const scheduledSessions: Record<string, ScheduledSession[]> = {
  "CS301": [
    { id: "1", date: "2024-01-15", time: "09:00", weekNumber: 1 },
    { id: "2", date: "2024-01-22", time: "09:00", weekNumber: 2 },
    { id: "3", date: "2024-01-29", time: "09:00", weekNumber: 3 },
    { id: "4", date: "2024-02-05", time: "09:00", weekNumber: 4 },
    { id: "5", date: "2024-02-12", time: "09:00", weekNumber: 5 },
    { id: "6", date: "2024-02-19", time: "09:00", weekNumber: 6 },
  ],
  "CS305": [
    { id: "1", date: "2024-01-16", time: "14:00", weekNumber: 1 },
    { id: "2", date: "2024-01-23", time: "14:00", weekNumber: 2 },
    { id: "3", date: "2024-01-30", time: "14:00", weekNumber: 3 },
    { id: "4", date: "2024-02-06", time: "14:00", weekNumber: 4 },
    { id: "5", date: "2024-02-13", time: "14:00", weekNumber: 5 },
    { id: "6", date: "2024-02-20", time: "14:00", weekNumber: 6 },
  ],
  "CS302": [
    { id: "1", date: "2024-01-17", time: "11:00", weekNumber: 1 },
    { id: "2", date: "2024-01-24", time: "11:00", weekNumber: 2 },
    { id: "3", date: "2024-01-31", time: "11:00", weekNumber: 3 },
    { id: "4", date: "2024-02-07", time: "11:00", weekNumber: 4 },
    { id: "5", date: "2024-02-14", time: "11:00", weekNumber: 5 },
    { id: "6", date: "2024-02-21", time: "11:00", weekNumber: 6 },
  ],
  "CS303": [
    { id: "1", date: "2024-01-18", time: "16:00", weekNumber: 1 },
    { id: "2", date: "2024-01-25", time: "16:00", weekNumber: 2 },
    { id: "3", date: "2024-02-01", time: "16:00", weekNumber: 3 },
    { id: "4", date: "2024-02-08", time: "16:00", weekNumber: 4 },
    { id: "5", date: "2024-02-15", time: "16:00", weekNumber: 5 },
    { id: "6", date: "2024-02-22", time: "16:00", weekNumber: 6 },
  ],
};

const mockStudentListForSession: StudentAttendanceRecord[] = [
  { id: "student-1", name: "Rachid IMOURIGUE", status: "PRESENT" },
  { id: "student-2", name: "Mohamed HAJJI", status: "PRESENT" },
  { id: "student-3", name: "Ayoub Marghad", status: "PRESENT" },
  { id: "student-4", name: "Fatima Zahra", status: "PRESENT" },
  { id: "student-5", name: "Yassine Alami", status: "PRESENT" },
  { id: "student-6", name: "Laila Bensouda", status: "PRESENT" },
  { id: "student-7", name: "Karim Idrissi", status: "PRESENT" },
  { id: "student-8", name: "Nadia Tazi", status: "PRESENT" },
  { id: "student-9", name: "Omar Benjelloun", status: "PRESENT" },
  { id: "student-10", name: "Salma Bakkali", status: "PRESENT" },
  { id: "student-11", name: "Mehdi Chraibi", status: "PRESENT" },
  { id: "student-12", name: "Amina Fassi", status: "PRESENT" },
  { id: "student-13", name: "Younes Berrada", status: "PRESENT" },
  { id: "student-14", name: "Hajar Mansouri", status: "PRESENT" },
  { id: "student-15", name: "Zakaria Bouali", status: "PRESENT" },
  { id: "student-16", name: "Soukaina Alaoui", status: "PRESENT" },
  { id: "student-17", name: "Hamza Bennani", status: "PRESENT" },
  { id: "student-18", name: "Imane Chaoui", status: "PRESENT" },
  { id: "student-19", name: "Youssef Lahrichi", status: "PRESENT" },
  { id: "student-20", name: "Zineb Moussaoui", status: "PRESENT" },
  { id: "student-21", name: "Adil Tahiri", status: "PRESENT" },
  { id: "student-22", name: "Houda Ziani", status: "PRESENT" },
  { id: "student-23", name: "Khalid Ouazzani", status: "PRESENT" },
  { id: "student-24", name: "Samira Doukkali", status: "PRESENT" },
  { id: "student-25", name: "Tarik El Amrani", status: "PRESENT" },
];

export const TeacherAttendance: FC = () => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [students, setStudents] = useState<StudentAttendanceRecord[]>([]);

  const availableModules = selectedMajor ? modulesByMajor[selectedMajor as keyof typeof modulesByMajor] || [] : [];
  const availableSessions = selectedModule ? scheduledSessions[selectedModule] || [] : [];

  // Group sessions by week
  const sessionsByWeek = useMemo(() => {
    const grouped: Record<number, ScheduledSession[]> = {};
    availableSessions.forEach(session => {
      if (!grouped[session.weekNumber]) {
        grouped[session.weekNumber] = [];
      }
      grouped[session.weekNumber].push(session);
    });
    return grouped;
  }, [availableSessions]);

  const handleMajorChange = (majorId: string) => {
    setSelectedMajor(majorId);
    setSelectedModule(""); // Reset module selection
    setSelectedSession(""); // Reset session selection
    setStudents([]); // Clear students
  };

  const handleModuleChange = (moduleId: string) => {
    setSelectedModule(moduleId);
    setSelectedSession(""); // Reset session selection
    setStudents([]); // Clear students
  };

  const handleSessionSelect = () => {
    if (selectedModule && selectedSession) {
      // In a real app, you'd fetch students for this module/session. Here, we just load the mock list.
      setStudents(mockStudentListForSession);
    }
  };

  const setStudentStatus = (
    studentId: string,
    status: StudentAttendanceRecord["status"]
  ) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
  };

  const markAllAsPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: "PRESENT" })));
  };

  const handleSubmitAttendance = () => {
    console.log("Submitting attendance sheet:", {
      major: selectedMajor,
      module: selectedModule,
      session: selectedSession,
      records: students,
    });
    alert("Attendance sheet has been saved (simulated).");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const selectedSessionData = availableSessions.find(s => s.id === selectedSession);

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Major Selection */}
          <div>
            <label
              htmlFor="major-select"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Major
            </label>
            <select
              id="major-select"
              value={selectedMajor}
              onChange={(e) => handleMajorChange(e.target.value)}
              className="w-full input-style"
            >
              <option value="">-- Choose a major --</option>
              {majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>
          </div>

          {/* Module Selection */}
          <div>
            <label
              htmlFor="module-select"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Module
            </label>
            <select
              id="module-select"
              value={selectedModule}
              onChange={(e) => handleModuleChange(e.target.value)}
              disabled={!selectedMajor}
              className="w-full input-style disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {selectedMajor ? "-- Choose a module --" : "Select major first"}
              </option>
              {availableModules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
            </select>
          </div>

          {/* Week/Session Selection */}
          <div>
            <label
              htmlFor="session-select"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Week & Session
            </label>
            <select
              id="session-select"
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              disabled={!selectedModule}
              className="w-full input-style disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {selectedModule ? "-- Choose a session --" : "Select module first"}
              </option>
              {Object.entries(sessionsByWeek).map(([weekNumber, sessions]) => (
                <optgroup key={weekNumber} label={`Week ${weekNumber}`}>
                  {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {formatDate(session.date)} at {session.time}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <button
            onClick={handleSessionSelect}
            disabled={!selectedModule || !selectedSession}
            className="btn-primary md:w-auto w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Load Student List
          </button>
        </div>
      </div>

      {/* --- Attendance Marking Sheet --- */}
      {students.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4 border-b dark:border-gray-700 flex flex-wrap justify-between items-center gap-4">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Attendance for{" "}
              {availableModules.find((m) => m.id === selectedModule)?.name} -{" "}
              {selectedSessionData && (
                <>
                  Week {selectedSessionData.weekNumber} - {formatDate(selectedSessionData.date)} at {selectedSessionData.time}
                </>
              )}
            </h3>
            <button
              onClick={markAllAsPresent}
              className="btn-secondary text-xs"
            >
              <CheckSquare size={14} className="mr-2" /> Mark All as Present
            </button>
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
                      status: "PRESENT",
                      icon: <Check size={14} />,
                      colors:
                        "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-200",
                      active: "bg-green-500 text-white",
                    },
                    {
                      label: "Absent",
                      status: "ABSENT",
                      icon: <X size={14} />,
                      colors:
                        "bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-200",
                      active: "bg-red-500 text-white",
                    },
                    {
                      label: "Late",
                      status: "LATE",
                      icon: <Clock size={14} />,
                      colors:
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-200",
                      active: "bg-yellow-500 text-white",
                    },
                    {
                      label: "Excused",
                      status: "EXCUSED",
                      icon: <AlertTriangle size={14} />,
                      colors:
                        "bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-200",
                      active: "bg-blue-500 text-white",
                    },
                  ].map((item) => (
                    <button
                      key={item.status}
                      onClick={() =>
                        setStudentStatus(student.id, item.status as any)
                      }
                      className={`flex items-center px-3 py-1.5 text-xs rounded-full transition-all ${
                        student.status === item.status
                          ? `${item.active} font-bold shadow-md`
                          : `${item.colors} hover:opacity-100`
                      }`}
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
          <div className="p-4 flex justify-end bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700">
            <button onClick={handleSubmitAttendance} className="btn-primary">
              <Save size={16} className="mr-2" />
              Save Attendance Sheet
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            No Session Selected
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a major, module, and session above to load the student list.
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
