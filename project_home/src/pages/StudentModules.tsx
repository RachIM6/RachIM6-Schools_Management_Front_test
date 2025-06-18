// --- START OF FILE: pages/StudentModules.tsx ---

import { FC, useState, useMemo, Fragment } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { BookOpen, Star, Clock, ChevronDown, CalendarDays, Book } from "lucide-react";
import { Disclosure, Transition } from "@headlessui/react";

const mockAcademicData = {
  "2024-2025": {
    "S2": [
      { title: "Advanced Algorithms", teacher: "Dr. Alan Turing", description: "Deep dive into algorithm design, complexity analysis, and optimization techniques." },
      { title: "Operating Systems", teacher: "Dr. Linus Torvalds", description: "Explore the core concepts of modern operating systems, from kernels to file systems." },
      { title: "Quantum Physics", teacher: "Dr. Marie Curie", description: "An introduction to the strange and fascinating world of quantum mechanics." },
    ]
  },
  "2023-2024": {
    "S1": [
      { title: "Linear Algebra", teacher: "Dr. Ada Lovelace", description: "Fundamental principles of vector spaces, matrices, and linear mappings.", score: 18 },
      { title: "Ethics in Technology", teacher: "Dr. Socrates", description: "Examine the moral and ethical dilemmas presented by emerging technologies.", score: 19 },
      { title: "Intro to Physics", teacher: "Dr. Galileo", description: "Classical mechanics and the laws of motion.", score: 16 },
    ],
    "S2": [
       { title: "Data Structures", teacher: "Dr. Grace Hopper", description: "Learn about fundamental data structures used in modern software.", score: 17 },
       { title: "Calculus II", teacher: "Dr. Isaac Newton", description: "Advanced topics in differential and integral calculus.", score: 15 },
    ]
  }
};

type AcademicYear = keyof typeof mockAcademicData;
type Semester = keyof typeof mockAcademicData[AcademicYear];

export const StudentModules: FC = () => {
  // --- STATE NOW INITIALIZES WITH NO SELECTION ---
  const [activeSelection, setActiveSelection] = useState<{ year: AcademicYear | null; semester: Semester | null }>({ year: null, semester: null });
  
  const displayedModules = useMemo(() => {
    if (!activeSelection.year || !activeSelection.semester) return [];

    let modules = mockAcademicData[activeSelection.year][activeSelection.semester] || [];
    
    // The "in-progress" semester is the latest one of the latest year.
    const isCompleted = activeSelection.year !== "2024-2025" || activeSelection.semester !== "S2";

    if (isCompleted) {
      modules = [...modules].sort((a, b) => (b.score || 0) - (a.score || 0));
    }
    
    return modules;
  }, [activeSelection]);

  return (
    <div className="space-y-8">
      <PageHeader title="My Modules" description="Browse your enrolled courses and review your performance." />
      
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {Object.keys(mockAcademicData).map((year, index) => (
            <Disclosure as="div" key={year}>
              {({ open }) => (
                <div className={index > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-md font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span className="flex items-center">
                        <CalendarDays className="h-5 w-5 text-blue-500 mr-3"/>
                        Academic Year {year}
                    </span>
                    <ChevronDown className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-blue-500 transition-transform`} />
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
                    <Disclosure.Panel className="px-6 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <div className="space-y-2">
                           {Object.keys(mockAcademicData[year as AcademicYear]).map(semester => (
                                <button
                                    key={semester}
                                    onClick={() => setActiveSelection({ year: year as AcademicYear, semester: semester as Semester })}
                                    className={`w-full flex items-center text-left p-3 rounded-lg transition-colors ${activeSelection.year === year && activeSelection.semester === semester
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`
                                    }
                                >
                                    <Book className="h-5 w-5 mr-3"/>
                                    Semester {semester.substring(1)}
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
      </div>

      {/* --- CONDITIONAL RENDERING BASED ON SELECTION --- */}
      {displayedModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedModules.map((mod) => {
            const isCompleted = activeSelection.year !== "2024-2025" || activeSelection.semester !== "S2";
            const progress = isCompleted ? 100 : 50;
            return (
              <div key={mod.title} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className="flex-grow">
                  <div className="flex items-center mb-2"><BookOpen className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" /><h3 className="text-lg font-bold text-gray-900 dark:text-white">{mod.title}</h3></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Taught by: {mod.teacher}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{mod.description}</p>
                </div>
                <div className="mt-auto space-y-4">
                  {isCompleted && mod.score && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/50 rounded-md">
                      <div className="flex items-center text-blue-700 dark:text-blue-300"><Star size={16} className="mr-2"/><span className="font-semibold text-sm">Final Score</span></div>
                      <span className="font-bold text-lg text-blue-800 dark:text-blue-200">{mod.score}/20</span>
                    </div>
                  )}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-1"><span className="flex items-center"><Clock size={12} className="mr-1"/> Progress</span><span>{progress}%</span></div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"><div className="h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: progress === 100 ? '#16a34a' : '#2563eb' }}></div></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
         <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400"/>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Awaiting Selection</h3>
            <p className="mt-1 text-sm text-gray-500">Please select an academic year and semester above to view your modules.</p>
        </div>
      )}
    </div>
  );
};
// --- END OF FILE: pages/StudentModules.tsx ---