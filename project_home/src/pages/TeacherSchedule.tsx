// --- START OF FILE: pages/teacher/TeacherSchedule.tsx ---

import { FC, useState, useMemo, Fragment } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ChevronDown, CalendarDays, Book, CalendarSearch, Users, FlaskConical, Hourglass, Building } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';

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

const teacherCourses = {
  'CS301': { title: 'Advanced Algorithms', filiere: 'CS Engineering' },
  'CS305': { title: 'Operating Systems', filiere: 'CS Engineering' },
  'PH210': { title: 'Quantum Physics', filiere: 'Applied Physics' },
};

const generateTeacherSemesterSchedule = (yearString: string, semester: 'S1' | 'S2') => {
  const schedule: Record<string, Record<Day, ScheduleEvent[]>> = {};
  const numWeeks = 14;
  const year = parseInt(semester === 'S1' ? yearString.split('-')[0] : yearString.split('-')[1]);
  const startDate = new Date(semester === 'S1' ? `${year}-09-04` : `${year}-01-29`);

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
    if (i % 3 === 0) {
      weeklySchedule.Monday.push({ start: 9, end: 11, ...teacherCourses.CS305, location: 'Amphi A', type: 'Lecture', color: eventPalettes.Lecture });
      weeklySchedule.Wednesday.push({ start: 14, end: 16, ...teacherCourses.CS301, location: 'Room B201', type: 'Tutorial', color: eventPalettes.Tutorial });
    } else if (i % 3 === 1) {
      weeklySchedule.Tuesday.push({ start: 10, end: 13, ...teacherCourses.CS301, location: 'Lab C10', type: 'Lab', color: eventPalettes.Lab });
      weeklySchedule.Thursday.push({ start: 14, end: 16, ...teacherCourses.PH210, location: 'PhysLab 2', type: 'Lecture', color: eventPalettes.Lecture });
      weeklySchedule.Friday.push({ start: 15, end: 17, title: 'Office Hours', filiere: 'All Students', location: 'Office B-3', type: 'Office Hours', color: eventPalettes['Office Hours'] });
    } else {
      weeklySchedule.Monday.push({ start: 14, end: 16, ...teacherCourses.CS305, location: 'Amphi A', type: 'Lecture', color: eventPalettes.Lecture });
      weeklySchedule.Tuesday.push({ start: 16, end: 17, title: 'Dept. Meeting', filiere: 'CS Dept.', location: 'Conf. Room 1', type: 'Meeting', color: eventPalettes.Meeting });
    }
    
    schedule[weekLabel] = weeklySchedule;
  }
  return schedule;
};

const mockTeacherScheduleData = {
  "2024-2025": { "S2": generateTeacherSemesterSchedule("2024-2025", "S2") },
  "2023-2024": { "S1": generateTeacherSemesterSchedule("2023-2024", "S1"), "S2": generateTeacherSemesterSchedule("2023-2024", "S2") },
};

type AcademicYear = keyof typeof mockTeacherScheduleData;
type Semester = keyof typeof mockTeacherScheduleData[AcademicYear];
type Week = keyof typeof mockTeacherScheduleData[AcademicYear][Semester];

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
  const [activeSelection, setActiveSelection] = useState<{ year: AcademicYear | null; semester: Semester | null; week: Week | null }>({ year: null, semester: null, week: null });

  const displayedSchedule = useMemo(() => {
    const { year, semester, week } = activeSelection;
    if (!year || !semester || !week) return null;
    return mockTeacherScheduleData[year]?.[semester]?.[week] || {};
  }, [activeSelection]);

  return (
    <div className="space-y-8">
      <PageHeader title="My Teaching Schedule" description="Your weekly timetable for all lectures, labs, and office hours." />

      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {Object.keys(mockTeacherScheduleData).map((year, yearIndex) => (
            <Disclosure as="div" key={year}>
              {({ open }) => (
                <div className={yearIndex > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-md font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span className="flex items-center"><CalendarDays className="h-5 w-5 text-blue-500 mr-3"/>Academic Year {year}</span>
                    <ChevronDown className={`${open ? 'rotate-180' : ''} h-5 w-5 text-blue-500 transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="space-y-4">
                      {Object.keys(mockTeacherScheduleData[year as AcademicYear]).map(semester => (
                        <Disclosure as="div" key={semester}>
                          {({ open: semesterOpen }) => (
                            <div>
                              <Disclosure.Button onClick={() => setActiveSelection({ year: year as AcademicYear, semester: semester as Semester, week: null })} className={`w-full flex justify-between items-center text-left p-3 rounded-lg transition-colors ${activeSelection.semester === semester && activeSelection.year === year ? 'bg-blue-100 dark:bg-blue-900/70' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                <span className="font-semibold flex items-center text-gray-800 dark:text-gray-200"><Book className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"/>Semester {semester.substring(1)}</span>
                                <ChevronDown className={`${semesterOpen ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform`} />
                              </Disclosure.Button>
                              <Transition as={Fragment} enter="transition duration-100 ease-out" enterFrom="transform -translate-y-2 opacity-0" enterTo="transform translate-y-0 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform translate-y-0 opacity-100" leaveTo="transform -translate-y-2 opacity-0">
                                <Disclosure.Panel className="pt-2 pl-6">
                                  <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                                    {Object.keys(mockTeacherScheduleData[year as AcademicYear][semester as Semester]).map(week => (
                                      <button key={week} onClick={() => setActiveSelection({ year: year as AcademicYear, semester: semester as Semester, week: week as Week })} className={`w-full text-left p-2 pl-4 rounded-md transition-colors text-sm font-medium ${activeSelection.week === week && activeSelection.semester === semester && activeSelection.year === year ? 'bg-blue-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                        Week: {week}
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
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
          <CalendarSearch className="mx-auto h-12 w-12 text-gray-400"/>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Awaiting Selection</h3>
          <p className="mt-1 text-sm text-gray-500">Please select a year, semester, and week to view a schedule.</p>
        </div>
      )}
    </div>
  );
};
// --- END OF FILE: pages/teacher/TeacherSchedule.tsx ---