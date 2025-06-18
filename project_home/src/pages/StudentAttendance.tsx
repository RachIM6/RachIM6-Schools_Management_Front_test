// --- START OF FILE: pages/StudentAttendance.tsx ---

import { FC, useState, useMemo, Fragment } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Check, X, AlertTriangle, CalendarDays, Book, CalendarCheck2, ChevronDown } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';

// --- UTILITY FUNCTION TO GENERATE REALISTIC DATA ---
const generateRealisticAttendanceData = (year: string, semester: 'S1' | 'S2', courses: string[]) => {
  const months = semester === 'S1' ? ['September', 'October', 'November', 'December'] : ['February', 'March', 'April', 'May'];
  const data = {};

  months.forEach((month, monthIndex) => {
    data[month] = [];
    const numSessions = 8; // Simulate ~2 sessions per week per month
    for (let i = 0; i < numSessions; i++) {
      const day = Math.floor(Math.random() * 28) + 1; // Random day 1-28
      const date = new Date(`${month} ${day}, ${semester === 'S1' ? year.split('-')[0] : year.split('-')[1]}`).toISOString().split('T')[0];
      const timeSlot = Math.random() > 0.5 ? '09:00 - 11:00' : '14:00 - 16:00';
      const course = courses[Math.floor(Math.random() * courses.length)];
      
      // Randomize status: 90% Present, 8% Absent, 2% Justified
      const rand = Math.random();
      let status = 'Present';
      if (rand > 0.9) status = 'Absent';
      if (rand > 0.98) status = 'Justified';

      data[month].push({ date, time: timeSlot, course, status });
    }
    // Sort by date within the month
    data[month].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });
  return data;
};

// --- DEEPLY STRUCTURED MOCK DATA USING THE GENERATOR ---
const mockAttendanceData = {
  "2024-2025": {
    "S2": generateRealisticAttendanceData("2024-2025", "S2", ["Advanced Algorithms", "Operating Systems", "Quantum Physics"]),
  },
  "2023-2024": {
    "S1": generateRealisticAttendanceData("2023-2024", "S1", ["Linear Algebra", "Ethics in Technology", "Intro to Physics"]),
    "S2": generateRealisticAttendanceData("2023-2024", "S2", ["Data Structures", "Calculus II", "Circuit Theory"]),
  }
};

type AcademicYear = keyof typeof mockAttendanceData;
type Semester = keyof typeof mockAttendanceData[AcademicYear];
type Month = keyof typeof mockAttendanceData[AcademicYear][Semester];

const StatusBadge: FC<{ status: string }> = ({ status }) => {
  const styles = {
    Present: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Absent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Justified: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  };
  const icons = { Present: <Check size={14} />, Absent: <X size={14} />, Justified: <AlertTriangle size={14} /> };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {icons[status]}
      <span className="ml-1.5">{status}</span>
    </span>
  );
};

export const StudentAttendance: FC = () => {
    const [activeSelection, setActiveSelection] = useState<{ year: AcademicYear | null; semester: Semester | null; month: Month | null }>({ year: null, semester: null, month: null });
  
    const displayedRecords = useMemo(() => {
        const { year, semester, month } = activeSelection;
        if (!year || !semester || !month) return [];
        return mockAttendanceData[year]?.[semester]?.[month] || [];
    }, [activeSelection]);

    return (
        <div className="space-y-8">
            <PageHeader title="My Attendance" description="Track your presence in all courses by selecting a period below." />

            <div className="w-full max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                    {Object.keys(mockAttendanceData).map((year, yearIndex) => (
                        <Disclosure as="div" key={year}>
                            {({ open }) => (
                                <div className={yearIndex > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}>
                                <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-md font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                    <span className="flex items-center"><CalendarDays className="h-5 w-5 text-blue-500 mr-3"/>Academic Year {year}</span>
                                    <ChevronDown className={`${open ? 'rotate-180' : ''} h-5 w-5 text-blue-500 transition-transform`} />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-6 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                    <div className="space-y-4">
                                        {Object.keys(mockAttendanceData[year as AcademicYear]).map(semester => (
                                        <Disclosure as="div" key={semester}>
                                            {({ open: semesterOpen }) => (
                                                <div>
                                                    <Disclosure.Button onClick={() => setActiveSelection({ year: year as AcademicYear, semester: semester as Semester, month: null })} className={`w-full flex justify-between items-center text-left p-3 rounded-lg transition-colors ${activeSelection.semester === semester && activeSelection.year === year ? 'bg-blue-100 dark:bg-blue-900/70' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                                        <span className="font-semibold flex items-center text-gray-800 dark:text-gray-200"><Book className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"/>Semester {semester.substring(1)}</span>
                                                        <ChevronDown className={`${semesterOpen ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform`} />
                                                    </Disclosure.Button>
                                                    <Transition as={Fragment} enter="transition duration-100 ease-out" enterFrom="transform -translate-y-2 opacity-0" enterTo="transform translate-y-0 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform translate-y-0 opacity-100" leaveTo="transform -translate-y-2 opacity-0">
                                                        <Disclosure.Panel className="pt-2 pl-6">
                                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                                                                {Object.keys(mockAttendanceData[year as AcademicYear][semester as Semester]).map(month => (
                                                                    <button 
                                                                        key={month} 
                                                                        onClick={() => setActiveSelection({ year: year as AcademicYear, semester: semester as Semester, month: month as Month })} 
                                                                        className={`w-full text-center p-2 rounded-lg transition-colors text-sm font-medium ${activeSelection.month === month && activeSelection.semester === semester && activeSelection.year === year ? 'bg-blue-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                                                    >
                                                                        {month}
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

            {displayedRecords.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mt-8">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-800 dark:text-white">Attendance for: {activeSelection.month}, {activeSelection.year} (Semester {activeSelection.semester?.substring(1)})</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Date</th><th className="px-6 py-3">Time</th>
                                    <th className="px-6 py-3">Course</th><th className="px-6 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedRecords.map((att, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{att.date}</td>
                                    <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-300">{att.time}</td>
                                    <td className="px-6 py-4">{att.course}</td>
                                    <td className="px-6 py-4 text-center"><StatusBadge status={att.status} /></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
                    <CalendarCheck2 className="mx-auto h-12 w-12 text-gray-400"/>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Awaiting Selection</h3>
                    <p className="mt-1 text-sm text-gray-500">Please select a year, semester, and month to view attendance records.</p>
                </div>
            )}
        </div>
    );
};
// --- END OF FILE: pages/StudentAttendance.tsx ---