// --- START OF FILE: pages/StudentSchedule.tsx ---

import { FC, useState, useMemo, Fragment } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { ChevronDown, CalendarDays, Book, CalendarSearch, Clock, MapPin, User } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';
import { useStudent } from '../context/StudentContext';
import { getMajorFromFiliereName } from '../utils/majorMapping';
import { 
  getStudentSchedule, 
  getAvailableSemesters, 
  getCurrentSemester,
  type Day,
  type ScheduleEvent,
  type WeeklySchedule,
  type SemesterSchedule
} from '../data/scheduleData';

// --- CORRECTLY IMPLEMENTED CALENDAR GRID COMPONENT ---
const ScheduleGrid: FC<{ weekLabel: string; schedule: WeeklySchedule | undefined }> = ({ weekLabel, schedule }) => {
  const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`); // 8:00 to 18:00

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg select-none mt-8">
      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Schedule for: {weekLabel}</h3>
      </div>
      <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] text-sm text-center border-t dark:border-gray-700">
        <div className="border-r border-b dark:border-gray-700"></div> {/* Top-left empty cell */}
        {days.map(day => <div key={day} className="font-bold py-2 border-r border-b dark:border-gray-700">{day}</div>)}
        
        {timeSlots.map(time => (
          <Fragment key={time}>
            <div className="text-xs text-right pr-2 pt-1 border-r h-16 dark:border-gray-700">{time}</div>
            {days.map(day => (
              <div key={`${day}-${time}`} className="border-r border-t relative dark:border-gray-700">
                {schedule?.[day]?.map(event => {
                  if (event.start === parseInt(time.split(':')[0])) {
                    return (
                      <div key={event.title} className={`absolute w-full p-2 rounded-lg text-left text-xs ${event.color} z-10 overflow-hidden`} style={{ height: `calc(${event.end - event.start} * 4rem - 1px)`, top: '0px' }}>
                        <div className="font-bold text-xs">{event.title}</div>
                        <div className="text-xs opacity-90">{event.moduleCode}</div>
                        <div className="text-xs opacity-75 flex items-center mt-1">
                          <MapPin size={10} className="mr-1" />
                          {event.location}
                        </div>
                        <div className="text-xs opacity-75 flex items-center">
                          <User size={10} className="mr-1" />
                          {event.teacher}
                        </div>
                        <div className="text-xs opacity-75 flex items-center">
                          <Clock size={10} className="mr-1" />
                          {event.type}
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

export const StudentSchedule: FC = () => {
  const { student } = useStudent();
  const [activeSelection, setActiveSelection] = useState<{ semesterId: string | null; week: string | null }>({ 
    semesterId: null, 
    week: null 
  });

  // Get student's major
  const studentMajor = useMemo(() => {
    if (!student?.filiereName) return null;
    return getMajorFromFiliereName(student.filiereName);
  }, [student?.filiereName]);

  // Get available semesters
  const availableSemesters = useMemo(() => {
    return getAvailableSemesters();
  }, []);

  // Get current semester
  const currentSemester = useMemo(() => {
    return getCurrentSemester();
  }, []);

  // Get schedule for selected semester
  const semesterSchedule = useMemo(() => {
    if (!activeSelection.semesterId || !studentMajor) return null;
    return getStudentSchedule(studentMajor.id, activeSelection.semesterId);
  }, [activeSelection.semesterId, studentMajor]);

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

  return (
    <div className="space-y-8">
      <PageHeader 
        title="My Schedule" 
        description={`Your weekly timetable for ${studentMajor?.name || 'your major'}.`} 
      />

      <div className="w-full max-w-4xl mx-auto">
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
                                    {semesterSchedule && Object.keys(semesterSchedule).map(week => (
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
                                    ))}
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
            No schedule is available for the selected semester and your major.
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
// --- END OF FILE: pages/StudentSchedule.tsx ---