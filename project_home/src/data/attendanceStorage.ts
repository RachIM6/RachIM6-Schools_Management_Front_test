// --- START OF FILE: data/attendanceStorage.ts ---

// Types for attendance storage
export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

export interface StudentAttendanceRecord {
  id: string;
  name: string;
  status?: AttendanceStatus;
}

export interface AttendanceSession {
  moduleInstanceId: string;
  weekId: string;
  date: string;
  time: string;
  weekNumber: number;
  weekLabel: string;
  students: StudentAttendanceRecord[];
  submittedAt?: string;
  submittedBy?: string;
}

export interface AttendanceStorage {
  sessions: Record<string, AttendanceSession>; // key: `${moduleInstanceId}-${weekId}`
}

// Local storage key
const ATTENDANCE_STORAGE_KEY = 'school_attendance_data';

// Initialize storage
const initializeStorage = (): AttendanceStorage => {
  const stored = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse stored attendance data:', error);
    }
  }
  return { sessions: {} };
};

// Save to localStorage
const saveToStorage = (data: AttendanceStorage): void => {
  try {
    localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save attendance data:', error);
  }
};

// Get storage instance
let storage: AttendanceStorage = initializeStorage();

// Storage API
export const attendanceStorage = {
  // Get all sessions
  getAllSessions: (): AttendanceSession[] => {
    return Object.values(storage.sessions);
  },

  // Get sessions for a specific module instance
  getSessionsByModule: (moduleInstanceId: string): AttendanceSession[] => {
    return Object.values(storage.sessions).filter(
      session => session.moduleInstanceId === moduleInstanceId
    );
  },

  // Get a specific session
  getSession: (moduleInstanceId: string, weekId: string): AttendanceSession | null => {
    const key = `${moduleInstanceId}-${weekId}`;
    return storage.sessions[key] || null;
  },

  // Save or update a session
  saveSession: (session: AttendanceSession): void => {
    const key = `${session.moduleInstanceId}-${session.weekId}`;
    storage.sessions[key] = {
      ...session,
      submittedAt: session.submittedAt || new Date().toISOString()
    };
    saveToStorage(storage);
  },

  // Update student attendance for a session
  updateStudentAttendance: (
    moduleInstanceId: string, 
    weekId: string, 
    studentId: string, 
    status: AttendanceStatus
  ): boolean => {
    const key = `${moduleInstanceId}-${weekId}`;
    const session = storage.sessions[key];
    
    if (!session) {
      return false;
    }

    const studentIndex = session.students.findIndex(s => s.id === studentId);
    if (studentIndex === -1) {
      return false;
    }

    session.students[studentIndex].status = status;
    saveToStorage(storage);
    return true;
  },

  // Update all students for a session
  updateSessionStudents: (
    moduleInstanceId: string, 
    weekId: string, 
    students: StudentAttendanceRecord[]
  ): boolean => {
    const key = `${moduleInstanceId}-${weekId}`;
    const session = storage.sessions[key];
    
    if (!session) {
      return false;
    }

    session.students = students;
    saveToStorage(storage);
    return true;
  },

  // Check if a session exists
  hasSession: (moduleInstanceId: string, weekId: string): boolean => {
    const key = `${moduleInstanceId}-${weekId}`;
    return key in storage.sessions;
  },

  // Delete a session
  deleteSession: (moduleInstanceId: string, weekId: string): boolean => {
    const key = `${moduleInstanceId}-${weekId}`;
    if (storage.sessions[key]) {
      delete storage.sessions[key];
      saveToStorage(storage);
      return true;
    }
    return false;
  },

  // Clear all data
  clearAll: (): void => {
    storage = { sessions: {} };
    localStorage.removeItem(ATTENDANCE_STORAGE_KEY);
  },

  // Get storage statistics
  getStats: () => {
    const sessions = Object.values(storage.sessions);
    return {
      totalSessions: sessions.length,
      totalStudents: sessions.reduce((sum, session) => sum + session.students.length, 0),
      submittedSessions: sessions.filter(s => s.submittedAt).length,
      modules: Array.from(new Set(sessions.map(s => s.moduleInstanceId)))
    };
  }
};

// --- END OF FILE: data/attendanceStorage.ts --- 