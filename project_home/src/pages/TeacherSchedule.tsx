// --- START OF FILE: pages/teacher/TeacherSchedule.tsx ---

import { FC, useState, useMemo, Fragment } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ChevronDown, CalendarDays, Book, CalendarSearch, Users, FlaskConical, Hourglass, Building } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';
import { useTeacher } from '@/context/TeacherContext';
import { 
  academicYears, 
  semesters, 
  getAcademicYearById, 
  getSemesterById,
  getModuleInstancesByTeacher,
  getModuleById,
  getTeacherById
} from '@/data/academicData';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
type EventType = 'Lecture' | 'Lab' | 'Tutorial' | 'Office Hours' | 'Meeting';

type ScheduleEvent = {
  start: number;
  end: number;
  title: string;
  filiere: string;
  location: string;
  type: EventType;
  color: string;
};

// --- DATA GENERATION FOR A REALISTIC TEACHER SCHEDULE ---

const eventPalettes: Record<EventType, string> = {
    'Lecture': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/70 dark:text-blue-200 dark:border-blue-800',
    'Lab': 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/70 dark:text-teal-200 dark:border-teal-700',
    'Tutorial': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/70 dark:text-green-200 dark:border-green-700',
    'Office Hours': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/70 dark:text-yellow-200 dark:border-yellow-800',
    'Meeting': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700/60 dark:text-gray-200 dark:border-gray-600',
};

// Room assignments for different types of classes
const roomAssignments = {
  lecture: ['Amphi A', 'Amphi B', 'Room B201', 'Room B202', 'Room C101', 'Room C102'],
  lab: ['Lab C10', 'Lab C5', 'Lab C8', 'PhysLab 1', 'PhysLab 2', 'Math Lab'],
  tutorial: ['Room D4', 'Room D5', 'Room E1', 'Room E2', 'Study Hall 1', 'Study Hall 2']
};

const generateTeacherSemesterSchedule = (semesterId: string, teacherId: string) => {
  const schedule: Record<string, Record<Day, ScheduleEvent[]>> = {};
  const semester = getSemesterById(semesterId);
  if (!semester) return {};

  const academicYear = getAcademicYearById(semester.academicYearId);
  if (!academicYear) return {};

  // Get modules for this semester and teacher
  const relevantInstances = getModuleInstancesByTeacher(teacherId).filter(instance => 
    instance.semesterId === semesterId
  );

  // Create course schedule data
  const courses = relevantInstances.map(instance => {
    const module = getModuleById(instance.moduleId);
    
    if (!module) return null;

    return {
      title: module.name,
      moduleCode: module.code,
      credits: module.credits,
      majorId: module.majorId
    };
  }).filter(Boolean);

  // Generate 14 weeks of schedule
  const numWeeks = 14;
  
  // Calculate start date based on semester
  const year = parseInt(academicYear.name.split('-')[semester.name === 'S1' ? 0 : 1]);
  const startDate = new Date(semester.name === 'S1' ? `${year}-09-02` : `${year}-02-03`);

  for (let i = 0; i < numWeeks; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + (i * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 4);
    
    const weekNumber = i + 1;
    const fromDate = weekStart.toLocaleDateString('en-US', { month: 'short' });
    const toDate = weekEnd.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const weekLabel = `Week ${weekNumber.toString().padStart(2, '0')} : ${fromDate} - ${toDate}`;
    
    let weeklySchedule: Record<Day, ScheduleEvent[]> = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };
    
    // Distribute courses across the week
    courses.forEach((course, index) => {
      if (!course) return;

      const availableDays: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const dayIndex = index % availableDays.length;
      const day = availableDays[dayIndex];

      // All classes are lectures, same day every week
      const classType: 'Lecture' = 'Lecture';
      const duration = course.credits >= 6 ? 2 : 1.5;
      
      // Fixed start times based on day to avoid conflicts
      const timeSlots = [9, 11, 13, 15, 17];
      const startTime = timeSlots[dayIndex % timeSlots.length];

      // Get appropriate room
      const roomType = 'lecture';
      const roomIndex = index % roomAssignments[roomType].length;
      const location = roomAssignments[roomType][roomIndex];

      const event: ScheduleEvent = {
        start: startTime,
        end: startTime + duration,
        title: course.title,
        filiere: course.majorId === 'major-cs' ? 'CS Engineering' : course.majorId === 'major-physics' ? 'Applied Physics' : 'Mathematics',
        location,
        type: classType,
        color: eventPalettes[classType]
      };

      weeklySchedule[day].push(event);
    });
    
    schedule[weekLabel] = weeklySchedule;
  }
  return schedule;
};

// Get all available semesters for a teacher
const getAvailableTeacherSemesters = () => {
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
const getCurrentTeacherSemester = () => {
  return semesters.find(semester => semester.isActive);
};

type AcademicYear = string;
type Semester = string;
type Week = string;

const eventIcons: Record<EventType, React.ReactNode> = {
    'Lecture': <Users size={12} />,
    'Lab': <FlaskConical size={12} />,
    'Tutorial': <Users size={12} />,
    'Office Hours': <Hourglass size={12} />,
    'Meeting': <Building size={12} />,
};

const ScheduleGrid: FC<{ weekLabel: string; schedule: Record<Day, ScheduleEvent[]> | undefined }> = ({ weekLabel, schedule = {} }) => {
  const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg select-none mt-8">
      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Schedule for: {weekLabel}</h3>
      </div>
      <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] text-sm text-center border-t dark:border-gray-700">
        <div className="border-r border-b dark:border-gray-700"></div> {/* Top-left empty cell */}
        {days.map(day => <div key={day} className="font-bold py-2 border-r border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">{day}</div>)}
        
        {timeSlots.map(time => (
          <Fragment key={time}>
            <div className="text-xs text-right pr-2 pt-1 border-r h-20 dark:border-gray-700 text-gray-500">{time}</div>
            {days.map(day => (
              <div key={`${day}-${time}`} className="border-r border-t relative dark:border-gray-700">
                {schedule[day]?.map(event => {
                  if (event.start === parseInt(time.split(':')[0])) {
                    return (
                      <div key={event.title} className={`absolute w-full p-2 rounded-md text-left text-xs ${event.color} z-10 overflow-hidden border-l-4`} style={{ height: `calc(${event.end - event.start} * 5rem - 1px)`, top: '0px' }}>
                        <p className="font-bold">{event.title}</p>
                        <p className="opacity-80">{event.location}</p>
                        <p className="opacity-80 font-mono text-xs">{event.filiere}</p>
                        <div className={`absolute bottom-1 right-2 px-1.5 py-0.5 rounded text-xs font-semibold flex items-center`}>
                           {eventIcons[event.type]} <span className="ml-1">{event.type}</span>
                        </div>
                      </div>
                    )
                  }
                  return null;
                })}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const TeacherSchedule: FC = () => {
  const { teacher } = useTeacher();
  const [activeSelection, setActiveSelection] = useState<{ semesterId: string | null; week: string | null }>({ 
    semesterId: null, 
    week: null 
  });

  // Get available semesters
  const availableSemesters = useMemo(() => {
    return getAvailableTeacherSemesters();
  }, []);

  // Get current semester
  const currentSemester = useMemo(() => {
    return getCurrentTeacherSemester();
  }, []);

  // Get schedule for selected semester
  const semesterSchedule = useMemo(() => {
    if (!activeSelection.semesterId || !teacher) return null;
    return generateTeacherSemesterSchedule(activeSelection.semesterId, teacher.keycloakId);
  }, [activeSelection.semesterId, teacher]);

  // Get displayed schedule for selected week
  const displayedSchedule = useMemo(() => {
    if (!semesterSchedule || !activeSelection.week) return null;
    return semesterSchedule[activeSelection.week] || null;
  }, [semesterSchedule, activeSelection.week]);

  // Group semesters by academic year
  const semestersByYear = useMemo(() => {
    const grouped: Record<string, typeof availableSemesters> = {};
    availableSemesters.forEach(semester => {
      if (!grouped[semester.academicYearName]) {
        grouped[semester.academicYearName] = [];
      }
      grouped[semester.academicYearName].push(semester);
    });
    return grouped;
  }, [availableSemesters]);

  // Show loading if teacher is not loaded
  if (!teacher) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title={`My Teaching Schedule`} 
        description={`Welcome back, Prof. ${teacher.lastName}! Here's your weekly timetable for all lectures, labs, and office hours.`} 
      />

      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {Object.keys(semestersByYear).map((academicYear, yearIndex) => (
            <Disclosure as="div" key={academicYear}>
              {({ open }) => (
                <div className={yearIndex > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-md font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span className="flex items-center">
                      <CalendarDays className="h-5 w-5 text-blue-500 mr-3"/>
                      Academic Year {academicYear}
                      {currentSemester && semestersByYear[academicYear].some(sem => sem.id === currentSemester.id) && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          Current
                        </span>
                      )}
                    </span>
                    <ChevronDown className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-blue-500 transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="space-y-4">
                      {semestersByYear[academicYear].map(semester => (
                        <Disclosure as="div" key={semester.id}>
                          {({ open: semesterOpen }) => (
                            <div>
                              <Disclosure.Button 
                                onClick={() => setActiveSelection({ semesterId: semester.id, week: null })} 
                                className={`w-full flex justify-between items-center text-left p-3 rounded-lg transition-colors ${
                                  activeSelection.semesterId === semester.id ? 'bg-blue-100 dark:bg-blue-900/70' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                              >
                                <span className="font-semibold flex items-center text-gray-800 dark:text-gray-200">
                                  <Book className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"/>
                                  Semester {semester.name.substring(1)}
                                  {semester.isActive && (
                                    <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                      Active
                                    </span>
                                  )}
                                </span>
                                <ChevronDown className={`${semesterOpen ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform`} />
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
                                <Disclosure.Panel className="pt-2 pl-6">
                                  <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                                    {(() => {
                                      // Generate schedule for this specific semester
                                      const semesterScheduleData = generateTeacherSemesterSchedule(semester.id, teacher.keycloakId);
                                      return Object.keys(semesterScheduleData).map(week => (
                                        <button 
                                          key={week} 
                                          onClick={() => setActiveSelection({ semesterId: semester.id, week })} 
                                          className={`w-full text-left p-2 pl-4 rounded-md transition-colors text-sm font-medium ${
                                            activeSelection.week === week && activeSelection.semesterId === semester.id 
                                              ? 'bg-blue-600 text-white shadow' 
                                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                          }`}
                                        >
                                          {week}
                                        </button>
                                      ));
                                    })()}
                                  </div>
                                </Disclosure.Panel>
                              </Transition>
                            </div>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>

      {displayedSchedule ? (
        <ScheduleGrid weekLabel={activeSelection.week!} schedule={displayedSchedule} />
      ) : activeSelection.semesterId ? (
        <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
          <CalendarSearch className="mx-auto h-12 w-12 text-gray-400"/>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No Schedule Available</h3>
          <p className="mt-1 text-sm text-gray-500">
            No schedule is available for the selected semester.
          </p>
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
          <CalendarSearch className="mx-auto h-12 w-12 text-gray-400"/>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Awaiting Selection</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a semester and week to view your schedule.
          </p>
        </div>
      )}
    </div>
  );
};
// --- END OF FILE: pages/teacher/TeacherSchedule.tsx ---