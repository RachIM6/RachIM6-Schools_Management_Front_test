// --- START OF FILE: pages/teacher/TeacherPlanning.tsx ---

import { FC } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ChevronDown, CalendarDays, BookOpen, Pencil, Repeat, Milestone } from 'lucide-react';
import { Disclosure } from '@headlessui/react';

// Common styles for timeline events for consistency
const planningEventStyles = {
    Courses: { icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/50' },
    Exams: { icon: Pencil, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/50' },
    CatchUp: { icon: Repeat, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/50' },
    Holiday: { icon: Milestone, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/50' },
};

// Rich, realistic planning data
const mockPlanningData = {
    "2024-2025": {
        S1: [
            { type: "Courses", title: "Semester 1 Begins", duration: "September 02, 2024" },
            { type: "Holiday", title: "Mid-Semester Break", duration: "October 28 - November 01, 2024" },
            { type: "Courses", title: "End of S1 Courses", duration: "December 20, 2024" },
            { type: "Exams", title: "Final Exams", duration: "January 06 - January 17, 2025" },
            { type: "CatchUp", title: "Catch-up Exams", duration: "January 27 - January 31, 2025" },
        ],
        S2: [
            { type: "Courses", title: "Semester 2 Begins", duration: "February 03, 2025" },
            { type: "Holiday", title: "Spring Break", duration: "April 14 - April 18, 2025" },
            { type: "Courses", title: "End of S2 Courses", duration: "May 23, 2025" },
            { type: "Exams", title: "Final Exams", duration: "June 02 - June 13, 2025" },
            { type: "CatchUp", title: "Catch-up Exams", duration: "June 23 - June 27, 2025" },
        ]
    },
};

// Sub-component for a single timeline item to keep code clean
const TimelineItem: FC<{ event: { type: keyof typeof planningEventStyles; title: string; duration: string; }; isLast: boolean; }> = ({ event, isLast }) => {
    const { icon: Icon, color, bg } = planningEventStyles[event.type];
    return (
        <li className="relative flex gap-x-4">
            <div className={`absolute left-3 top-0 flex w-6 justify-center ${isLast ? 'h-6' : '-bottom-6'}`}>
                <div className="w-px bg-gray-200 dark:bg-gray-600" />
            </div>
            <div className={`relative flex h-6 w-6 flex-none items-center justify-center rounded-full ${bg}`}>
                <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <div className="flex-auto pt-0.5">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{event.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{event.duration}</p>
            </div>
        </li>
    );
};

export const TeacherPlanning: FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader title="Academic Planning" description="Official calendar for courses, exams, and key university dates." />
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {Object.entries(mockPlanningData).map(([year, semesters], yearIndex) => (
            <Disclosure as="div" key={year} defaultOpen={year === "2024-2025"}>
              {({ open }) => (
                <div className={yearIndex > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-lg font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none">
                    <span className="flex items-center"><CalendarDays className="h-6 w-6 text-blue-500 mr-3"/>Academic Year {year}</span>
                    <ChevronDown className={`${open ? 'rotate-180' : ''} h-5 w-5 text-blue-500 transition-transform`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-6 pt-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                      {Object.entries(semesters).map(([semesterKey, events]) => (
                        <div key={semesterKey}>
                          <h4 className="font-bold text-gray-800 dark:text-white mb-4 text-md">Semester {semesterKey.substring(1)}</h4>
                          <ul className="space-y-6">
                            {events.map((event, eventIndex) => (
                              <TimelineItem key={event.title} event={event} isLast={eventIndex === events.length - 1} />
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};
// --- END OF FILE: pages/teacher/TeacherPlanning.tsx ---