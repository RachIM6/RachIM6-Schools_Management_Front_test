// --- START OF FILE: data/scheduleData.ts ---

import { 
  academicYears, 
  semesters, 
  moduleInstances, 
  getModuleById, 
  getTeacherById,
  getSemesterById,
  getAcademicYearById
} from './academicData';

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface ScheduleEvent {
  start: number;
  end: number;
  title: string;
  location: string;
  color: string;
  teacher: string;
  moduleCode: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface WeeklySchedule {
  Monday: ScheduleEvent[];
  Tuesday: ScheduleEvent[];
  Wednesday: ScheduleEvent[];
  Thursday: ScheduleEvent[];
  Friday: ScheduleEvent[];
}

export interface SemesterSchedule {
  [weekLabel: string]: WeeklySchedule;
}

// Course color palettes for different majors
const coursePalettes = {
  CS: 'bg-blue-200 text-blue-900 border border-blue-300 dark:bg-blue-900/70 dark:text-blue-100 dark:border-blue-700',
  PH: 'bg-purple-200 text-purple-900 border border-purple-300 dark:bg-purple-900/70 dark:text-purple-100 dark:border-purple-700',
  MA: 'bg-green-200 text-green-900 border border-green-300 dark:bg-green-900/70 dark:text-green-100 dark:border-green-700',
  ETH: 'bg-pink-200 text-pink-900 border border-pink-300 dark:bg-pink-900/70 dark:text-pink-100 dark:border-pink-700'
};

// Room assignments for different types of classes
const roomAssignments = {
  lecture: ['Amphi A', 'Amphi B', 'Room B201', 'Room B202', 'Room C101', 'Room C102'],
  lab: ['Lab C10', 'Lab C5', 'Lab C8', 'PhysLab 1', 'PhysLab 2', 'Math Lab'],
  tutorial: ['Room D4', 'Room D5', 'Room E1', 'Room E2', 'Study Hall 1', 'Study Hall 2']
};

// Generate realistic schedule for a semester based on module instances
export const generateSemesterSchedule = (semesterId: string, studentMajorId: string): SemesterSchedule => {
  const semester = getSemesterById(semesterId);
  if (!semester) return {};

  const academicYear = getAcademicYearById(semester.academicYearId);
  if (!academicYear) return {};

  // Get modules for this semester and student's major
  const relevantInstances = moduleInstances.filter(instance => 
    instance.semesterId === semesterId
  );

  // Filter by student's major
  const majorInstances = relevantInstances.filter(instance => {
    const module = getModuleById(instance.moduleId);
    return module && module.majorId === studentMajorId;
  });

  // Create course schedule data
  const courses = majorInstances.map(instance => {
    const module = getModuleById(instance.moduleId);
    const teacher = getTeacherById(instance.teacherId);
    
    if (!module || !teacher) return null;

    const moduleCode = module.code;
    const colorKey = moduleCode.substring(0, 2) as keyof typeof coursePalettes;
    const color = coursePalettes[colorKey] || coursePalettes.CS;

    return {
      title: module.name,
      moduleCode: module.code,
      teacher: `${teacher.firstName} ${teacher.lastName}`,
      color,
      credits: module.credits
    };
  }).filter(Boolean);

  // Generate 14 weeks of schedule
  const schedule: SemesterSchedule = {};
  const numWeeks = 14;
  
  // Calculate start date based on semester
  const year = parseInt(academicYear.name.split('-')[semester.name === 'S1' ? 0 : 1]);
  const startDate = new Date(semester.name === 'S1' ? `${year}-09-02` : `${year}-02-03`);

  for (let week = 0; week < numWeeks; week++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + (week * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 4);
    
    const weekLabel = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} - ${weekEnd.toLocaleDateString('en-US', { day: '2-digit', year: 'numeric' })}`;

    // Create weekly schedule
    const weeklySchedule: WeeklySchedule = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    };

    // Distribute courses across the week - ensure each course gets a different day
    const availableDays: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    courses.forEach((course, index) => {
      if (!course) return;

      // Assign each course to a specific day - ensure distribution across all days
      const dayIndex = index % availableDays.length;
      const day = availableDays[dayIndex];

      // Determine class type and timing based on credits
      let classType: 'Lecture' | 'Lab' | 'Tutorial';
      let duration: number;
      let startTime: number;

      if (course.credits >= 6) {
        // 6+ credits: 2 lectures + 1 lab per week
        if (week % 3 === 0) {
          // Week 1, 4, 7, 10, 13: First lecture
          classType = 'Lecture';
          duration = 2;
          // Different start times based on day to avoid conflicts
          const timeSlots = [9, 11, 13, 15, 17];
          startTime = timeSlots[dayIndex % timeSlots.length];
        } else if (week % 3 === 1) {
          // Week 2, 5, 8, 11, 14: Second lecture
          classType = 'Lecture';
          duration = 2;
          // Different start times for second lecture
          const timeSlots = [10, 12, 14, 16, 18];
          startTime = timeSlots[dayIndex % timeSlots.length];
        } else {
          // Week 3, 6, 9, 12: Lab session
          classType = 'Lab';
          duration = 3;
          // Lab sessions in morning or afternoon
          const timeSlots = [9, 14];
          startTime = timeSlots[dayIndex % timeSlots.length];
        }
      } else {
        // 3 credits: 1 lecture + 1 tutorial per week
        if (week % 2 === 0) {
          // Even weeks: Lecture
          classType = 'Lecture';
          duration = 1.5;
          // Spread lecture times across different hours
          const timeSlots = [10, 11.5, 13, 14.5, 16];
          startTime = timeSlots[dayIndex % timeSlots.length];
        } else {
          // Odd weeks: Tutorial
          classType = 'Tutorial';
          duration = 1;
          // Tutorial sessions in afternoon
          const timeSlots = [14, 15.5, 17, 18.5, 20];
          startTime = timeSlots[dayIndex % timeSlots.length];
        }
      }

      // Get appropriate room
      const roomType = classType === 'Lab' ? 'lab' : classType === 'Lecture' ? 'lecture' : 'tutorial';
      const roomIndex = (week + index) % roomAssignments[roomType].length;
      const location = roomAssignments[roomType][roomIndex];

      const event: ScheduleEvent = {
        start: startTime,
        end: startTime + duration,
        title: course.title,
        location,
        color: course.color,
        teacher: course.teacher,
        moduleCode: course.moduleCode,
        type: classType
      };

      weeklySchedule[day].push(event);
    });

    schedule[weekLabel] = weeklySchedule;
  }

  return schedule;
};

// Get schedule for a specific student
export const getStudentSchedule = (studentMajorId: string, semesterId: string): SemesterSchedule => {
  return generateSemesterSchedule(semesterId, studentMajorId);
};

// Get all available semesters for a student
export const getAvailableSemesters = () => {
  return semesters.map(semester => {
    const academicYear = getAcademicYearById(semester.academicYearId);
    return {
      id: semester.id,
      name: semester.name,
      academicYearName: academicYear?.name || '',
      isActive: semester.isActive,
      startDate: semester.startDate,
      endDate: semester.endDate
    };
  }).sort((a, b) => {
    // Sort by academic year (newest first), then by semester
    const yearComparison = b.academicYearName.localeCompare(a.academicYearName);
    if (yearComparison !== 0) return yearComparison;
    return a.name.localeCompare(b.name);
  });
};

// Get current semester
export const getCurrentSemester = () => {
  return semesters.find(semester => semester.isActive);
};

// Get next semester
export const getNextSemester = () => {
  const currentSemester = getCurrentSemester();
  if (!currentSemester) return null;

  const currentYear = getAcademicYearById(currentSemester.academicYearId);
  if (!currentYear) return null;

  // Find next semester in same year or next year
  if (currentSemester.name === 'S1') {
    return semesters.find(sem => 
      sem.academicYearId === currentSemester.academicYearId && sem.name === 'S2'
    );
  } else {
    // Find S1 of next year
    const nextYear = academicYears.find(year => 
      year.name === (parseInt(currentYear.name.split('-')[1]) + 1).toString() + '-' + (parseInt(currentYear.name.split('-')[1]) + 2).toString()
    );
    if (nextYear) {
      return semesters.find(sem => 
        sem.academicYearId === nextYear.id && sem.name === 'S1'
      );
    }
  }
  return null;
};

// --- END OF FILE: data/scheduleData.ts --- 