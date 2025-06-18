// --- START OF NEW FILE: pages/StudentPlanning.tsx ---

import { FC } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { ChevronDown, CalendarDays, BookOpen, Pencil, Repeat } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';

const planningEventStyles = {
    Courses: { icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/50' },
    Exams: { icon: Pencil, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/50' },
    CatchUp: { icon: Repeat, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/50' },
};

const mockPlanningData = {
    "2024-2025": {
        S1: [
            { type: "Courses", title: "Course Period", duration: "September - December" },
            { type: "Exams", title: "Final Exams", duration: "January" },
            { type: "CatchUp", title: "Catch-up Exams", duration: "Late January" },
        ],
        S2: [
            { type: "Courses", title: "Course Period", duration: "February - May" },
            { type: "Exams", title: "Final Exams", duration: "June" },
            { type: "CatchUp", title: "Catch-up Exams", duration: "Late June" },
        ]
    },
    "2023-2024": {
        S1: [
            { type: "Courses", title: "Course Period", duration: "September - December" },
            { type: "Exams", title: "Final Exams", duration: "January" },
            { type: "CatchUp", title: "Catch-up Exams", duration: "Late January" },
        ],
        S2: [
            { type: "Courses", title: "Course Period", duration: "February - May" },
            { type: "Exams", title: "Final Exams", duration: "June" },
            { type: "CatchUp", title: "Catch-up Exams", duration: "Late June" },
        ]
    }
};

type TimelineEventProps = {
    event: { type: keyof typeof planningEventStyles; title: string; duration: string; };
    isLast: boolean;
};

const TimelineItem: FC<TimelineEventProps> = ({ event, isLast }) => {
    const { icon: Icon, color, bg } = planningEventStyles[event.type];
    return (
        <li className="relative flex gap-x-4">
            <div className={`absolute left-0 top-0 flex w-6 justify-center ${isLast ? 'h-6' : '-bottom-6'}`}>
                <div className="w-px bg-gray-200 dark:bg-gray-600" />
            </div>
            <div className={`relative flex h-6 w-6 flex-none items-center justify-center rounded-full ${bg}`}>
                <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <div className="flex-auto py-0.5">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{event.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{event.duration}</p>
            </div>
        </li>
    );
};

export const StudentPlanning: FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader title="Academic Planning" description="View the official calendar for courses, exams, and key dates." />
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {Object.entries(mockPlanningData).map(([year, semesters], yearIndex) => (
            <Disclosure as="div" key={year} defaultOpen={year === "2024-2025"}>
              {({ open }) => (
                <div className={yearIndex > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-md font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span className="flex items-center text-lg"><CalendarDays className="h-6 w-6 text-blue-500 mr-3"/>Academic Year {year}</span>
                    <ChevronDown className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-blue-500 transition-transform`} />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform -translate-y-4 opacity-0"
                    enterTo="transform translate-y-0 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform translate-y-0 opacity-100"
                    leaveTo="transform -translate-y-4 opacity-0"
                  >
                    <Disclosure.Panel className="px-6 pb-6 pt-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Semester 1 Timeline */}
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white mb-4">Semester 1</h4>
                                <ul className="space-y-6">
                                    {semesters.S1.map((event, eventIndex) => (
                                        <TimelineItem key={event.title} event={event} isLast={eventIndex === semesters.S1.length - 1} />
                                    ))}
                                </ul>
                            </div>
                             {/* Semester 2 Timeline */}
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white mb-4">Semester 2</h4>
                                <ul className="space-y-6">
                                    {semesters.S2.map((event, eventIndex) => (
                                        <TimelineItem key={event.title} event={event} isLast={eventIndex === semesters.S2.length - 1} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};
// --- END OF NEW FILE: pages/StudentPlanning.tsx ---