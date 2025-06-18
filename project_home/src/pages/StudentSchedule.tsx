// --- START OF FILE: pages/StudentSchedule.tsx ---

import { FC, useState, useMemo, Fragment } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { ChevronDown, CalendarDays, Book, CalendarSearch } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

type ScheduleEvent = {
  start: number;
  end: number;
  title: string;
  location: string;
  color: string;
};

// --- DATA GENERATION FACTORY FOR REALISTIC SCHEDULES ---

const coursePalettes = {
    CS: 'bg-blue-200 text-blue-900 border border-blue-300 dark:bg-blue-900/70 dark:text-blue-100 dark:border-blue-700',
    MATH: 'bg-green-200 text-green-900 border border-green-300 dark:bg-green-900/70 dark:text-green-100 dark:border-green-700',
    PHYS: 'bg-purple-200 text-purple-900 border border-purple-300 dark:bg-purple-900/70 dark:text-purple-100 dark:border-purple-700',
    PHIL: 'bg-pink-200 text-pink-900 border border-pink-300 dark:bg-pink-900/70 dark:text-pink-100 dark:border-pink-700',
    EE: 'bg-teal-200 text-teal-900 border border-teal-300 dark:bg-teal-900/70 dark:text-teal-100 dark:border-teal-700'
};

const S2_COURSES_CURRENT = [
    { title: 'Advanced Algorithms', location: 'Lab C10', color: coursePalettes.CS },
    { title: 'Operating Systems', location: 'Amphi A', color: coursePalettes.CS },
    { title: 'Quantum Physics', location: 'PhysLab 2', color: coursePalettes.PHYS },
];

const S1_COURSES_PAST = [
    { title: 'Linear Algebra', location: 'Room B201', color: coursePalettes.MATH },
    { title: 'Ethics in Technology', location: 'Room D4', color: coursePalettes.PHIL },
    { title: 'Intro to Physics', location: 'Phys Hall 1', color: coursePalettes.PHYS },
];

const S2_COURSES_PAST = [
    { title: 'Data Structures', location: 'Lab C5', color: coursePalettes.CS },
    { title: 'Calculus II', location: 'Math Hall', color: coursePalettes.MATH },
    { title: 'Circuit Theory', location: 'EE Lab 3', color: coursePalettes.EE },
];

const generateFullSemesterSchedule = (yearString: string, semester: 'S1' | 'S2', courses: { title: string; location: string; color: string }[]) => {
  const schedule = {};
  const numWeeks = 14;
  const year = parseInt(semester === 'S1' ? yearString.split('-')[0] : yearString.split('-')[1]);
  const startDate = new Date(semester === 'S1' ? `${year}-09-04` : `${year}-01-29`); // Start ~Sep 4 or ~Jan 29

  for (let i = 0; i < numWeeks; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + (i * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 4);
    
    const weekLabel = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} - ${weekEnd.toLocaleDateString('en-US', { day: '2-digit', year: 'numeric' })}`;

    let weeklySchedule: Record<Day, ScheduleEvent[]> = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };
    if (i % 3 === 0) {
      weeklySchedule.Monday.push({ start: 9, end: 11, ...courses[0] });
      weeklySchedule.Wednesday.push({ start: 14, end: 16, ...courses[1] });
    } else if (i % 3 === 1) {
      weeklySchedule.Tuesday.push({ start: 10, end: 12, ...courses[1] });
      weeklySchedule.Thursday.push({ start: 11, end: 13, ...courses[2] });
      weeklySchedule.Friday.push({ start: 9, end: 11, ...courses[0] });
    } else {
      weeklySchedule.Monday.push({ start: 14, end: 17, ...courses[2] });
      weeklySchedule.Wednesday.push({ start: 9, end: 11, ...courses[1] });
    }

    schedule[weekLabel] = weeklySchedule;
  }
  return schedule;
};

const mockScheduleData = {
  "2024-2025": { "S2": generateFullSemesterSchedule("2024-2025", "S2", S2_COURSES_CURRENT) },
  "2023-2024": { "S1": generateFullSemesterSchedule("2023-2024", "S1", S1_COURSES_PAST), "S2": generateFullSemesterSchedule("2023-2024", "S2", S2_COURSES_PAST) },
};

type AcademicYear = keyof typeof mockScheduleData;
type Semester = keyof typeof mockScheduleData[AcademicYear];
type Week = keyof typeof mockScheduleData[AcademicYear][Semester];

// --- CORRECTLY IMPLEMENTED CALENDAR GRID COMPONENT ---
const ScheduleGrid: FC<{ weekLabel: string; schedule: Record<Day, ScheduleEvent[]> | undefined }> = ({ weekLabel, schedule = {} }) => {
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
                {schedule[day]?.map(event => {
                  if (event.start === parseInt(time.split(':')[0])) {
                    return (
                      <div key={event.title} className={`absolute w-full p-2 rounded-lg text-left text-xs ${event.color} z-10 overflow-hidden`} style={{ height: `calc(${event.end - event.start} * 4rem - 1px)`, top: '0px' }}>
                        <p className="font-bold">{event.title}</p>
                        <p>{event.location}</p>
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
  const [activeSelection, setActiveSelection] = useState<{ year: AcademicYear | null; semester: Semester | null; week: Week | null }>({ year: null, semester: null, week: null });

  const displayedSchedule = useMemo(() => {
    const { year, semester, week } = activeSelection;
    if (!year || !semester || !week) return null;
    return mockScheduleData[year]?.[semester]?.[week] || null;
  }, [activeSelection]);

  return (
    <div className="space-y-8">
      <PageHeader title="My Schedule" description="Your weekly timetable for all classes and labs." />

      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {Object.keys(mockScheduleData).map((year, yearIndex) => (
            <Disclosure as="div" key={year}>
              {({ open }) => (
                <div className={yearIndex > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-md font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span className="flex items-center"><CalendarDays className="h-5 w-5 text-blue-500 mr-3"/>Academic Year {year}</span>
                    <ChevronDown className={`${open ? 'rotate-180' : ''} h-5 w-5 text-blue-500 transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="space-y-4">
                      {Object.keys(mockScheduleData[year as AcademicYear]).map(semester => (
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
                                    {Object.keys(mockScheduleData[year as AcademicYear][semester as Semester]).map(week => (
                                      <button key={week} onClick={() => setActiveSelection({ year: year as AcademicYear, semester: semester as Semester, week: week as Week })} className={`w-full text-left p-2 pl-4 rounded-md transition-colors text-sm font-medium ${activeSelection.week === week && activeSelection.semester === semester && activeSelection.year === year ? 'bg-blue-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
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
// --- END OF FILE: pages/StudentSchedule.tsx ---