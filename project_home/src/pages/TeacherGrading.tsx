// --- START OF NEW FILE: pages/teacher/TeacherGrading.tsx ---
import { FC, useState, useMemo } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Save, AlertTriangle, Percent, BookOpen, ChevronDown } from "lucide-react";

const mockStudents = [
  {
    id: "student-1",
    name: "Rachid IMOURIGUE",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-2",
    name: "Mohamed HAJJI",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-3",
    name: "Ayoub Marghad",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-4",
    name: "Fatima Zahra",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-5",
    name: "Yassine Alami",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-6",
    name: "Laila Bensouda",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-7",
    name: "Karim Idrissi",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-8",
    name: "Nadia Tazi",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-9",
    name: "Omar Benjelloun",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-10",
    name: "Salma Bakkali",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-11",
    name: "Mehdi Chraibi",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-12",
    name: "Amina Fassi",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-13",
    name: "Younes Berrada",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-14",
    name: "Hajar Mansouri",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
  {
    id: "student-15",
    name: "Zakaria Bouali",
    grades: {
      control: null as number | null,
      project: null as number | null,
      finalExam: null as number | null,
    },
  },
];

const majors = [
  { id: "CS", name: "Computer Science" },
  { id: "ENG", name: "Engineering" },
  { id: "BUS", name: "Business" },
  { id: "PH", name: "Physics" },
];

const modulesByMajor = {
  CS: [
    { id: "CS305", name: "Operating Systems" },
    { id: "CS301", name: "Advanced Algorithms" },
    { id: "CS302", name: "Database Systems" },
    { id: "CS303", name: "Software Engineering" },
  ],
  ENG: [
    { id: "ENG201", name: "Mechanical Engineering" },
    { id: "ENG202", name: "Electrical Engineering" },
    { id: "ENG203", name: "Civil Engineering" },
  ],
  BUS: [
    { id: "BUS101", name: "Business Management" },
    { id: "BUS102", name: "Marketing" },
    { id: "BUS103", name: "Finance" },
  ],
  PH: [
    { id: "PH210", name: "Quantum Physics" },
    { id: "PH211", name: "Classical Mechanics" },
    { id: "PH212", name: "Thermodynamics" },
  ],
};

export const TeacherGrading: FC = () => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [weights, setWeights] = useState({
    control: 30,
    project: 20,
    finalExam: 50,
  });
  const [grades, setGrades] = useState(mockStudents);

  const availableModules = selectedMajor ? modulesByMajor[selectedMajor as keyof typeof modulesByMajor] || [] : [];

  const totalWeight = useMemo(
    () => weights.control + weights.project + weights.finalExam,
    [weights]
  );

  const handleMajorChange = (majorId: string) => {
    setSelectedMajor(majorId);
    setSelectedModule(""); // Reset module selection when major changes
  };

  const handleModuleChange = (moduleId: string) => {
    setSelectedModule(moduleId);
  };

  const handleWeightChange = (type: keyof typeof weights, value: string) => {
    const numValue = value === "" ? 0 : parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setWeights((prev) => ({ ...prev, [type]: numValue }));
    }
  };

  const handleGradeChange = (
    studentId: string,
    type: "control" | "project" | "finalExam",
    value: string
  ) => {
    const score =
      value === "" ? null : Math.min(Math.max(parseFloat(value), 0), 20);
    setGrades((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, grades: { ...s.grades, [type]: score } }
          : s
      )
    );
  };

  const calculateFinalGrade = (g: {
    control: number | null;
    project: number | null;
    finalExam: number | null;
  }) => {
    if (
      g.control === null ||
      g.project === null ||
      g.finalExam === null ||
      totalWeight !== 100
    )
      return null;
    const final =
      g.control * (weights.control / 100) +
      g.project * (weights.project / 100) +
      g.finalExam * (weights.finalExam / 100);
    return final.toFixed(2);
  };

  const showGradeForms = selectedMajor && selectedModule;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Grade Management"
        description="Set grade weights and enter scores for your students."
      />

      {/* Major and Module Selection */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2 h-5 w-5" /> Course Selection
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Major Selection */}
          <div>
            <label
              htmlFor="major-select"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Select Major
            </label>
            <select
              id="major-select"
              value={selectedMajor}
              onChange={(e) => handleMajorChange(e.target.value)}
              className="w-full input-style"
            >
              <option value="">Choose a major...</option>
              {majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>
          </div>

          {/* Module Selection */}
          <div>
            <label
              htmlFor="module-select"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Select Module
            </label>
            <select
              id="module-select"
              value={selectedModule}
              onChange={(e) => handleModuleChange(e.target.value)}
              disabled={!selectedMajor}
              className="w-full input-style disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {selectedMajor ? "Choose a module..." : "Select major first"}
              </option>
              {availableModules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!showGradeForms && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Please select both a major and module to proceed with grading.
            </p>
          </div>
        )}
      </div>

      {/* Weight Configuration - Only show after module selection */}
      {selectedModule && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Percent className="mr-2 h-5 w-5" /> Grade Weighting Configuration
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Control Weight (%)
                </label>
                <input
                  type="number"
                  value={weights.control}
                  onChange={(e) => handleWeightChange("control", e.target.value)}
                  className="w-full input-style"
                  placeholder="30"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Project Weight (%)
                </label>
                <input
                  type="number"
                  value={weights.project}
                  onChange={(e) => handleWeightChange("project", e.target.value)}
                  className="w-full input-style"
                  placeholder="20"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Final Exam Weight (%)
                </label>
                <input
                  type="number"
                  value={weights.finalExam}
                  onChange={(e) =>
                    handleWeightChange("finalExam", e.target.value)
                  }
                  className="w-full input-style"
                  placeholder="50"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            {totalWeight !== 100 && (
              <div className="flex items-center text-red-600 dark:text-red-400">
                <AlertTriangle size={16} className="mr-2" /> 
                Total weight must be 100%. Current: {totalWeight}%.
              </div>
            )}
            {totalWeight === 100 && (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                Weight distribution is valid (100%).
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grade Forms - Only show after both major and module are selected */}
      {showGradeForms && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Student Grades - {availableModules.find(m => m.id === selectedModule)?.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Enter grades for each student (0-20 scale)
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-3 font-medium">Student Name</th>
                  <th className="px-6 py-3 font-medium">Control Score (/20)</th>
                  <th className="px-6 py-3 font-medium">Project Score (/20)</th>
                  <th className="px-6 py-3 font-medium">Final Exam (/20)</th>
                  <th className="px-6 py-3 font-medium">Final Grade (/20)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {grades.map((student) => {
                  const finalGrade = calculateFinalGrade(student.grades);
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                        {student.name}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="20"
                          value={student.grades.control ?? ""}
                          onChange={(e) =>
                            handleGradeChange(
                              student.id,
                              "control",
                              e.target.value
                            )
                          }
                          className="w-24 input-style"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="20"
                          value={student.grades.project ?? ""}
                          onChange={(e) =>
                            handleGradeChange(
                              student.id,
                              "project",
                              e.target.value
                            )
                          }
                          className="w-24 input-style"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="20"
                          value={student.grades.finalExam ?? ""}
                          onChange={(e) =>
                            handleGradeChange(
                              student.id,
                              "finalExam",
                              e.target.value
                            )
                          }
                          className="w-24 input-style"
                        />
                      </td>
                      <td
                        className={`px-6 py-4 font-bold text-lg text-center ${
                          finalGrade === null
                            ? "text-gray-400"
                            : finalGrade >= "10.00"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {finalGrade ?? "..."}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex justify-end bg-gray-50 dark:bg-gray-900/50">
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={totalWeight !== 100}
            >
              <Save size={16} className="mr-2" />
              Submit All Grades
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .input-style {
          display: block;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          background-color: white;
          color: #374151;
        }
        .dark .input-style {
          background-color: #374151;
          border-color: #4b5563;
          color: #f9fafb;
        }
        .input-style:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .dark .input-style:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
        }
      `}</style>
    </div>
  );
};
// --- END OF FILE: pages/teacher/TeacherGrading.tsx ---
