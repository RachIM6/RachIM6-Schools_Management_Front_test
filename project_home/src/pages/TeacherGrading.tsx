// --- START OF NEW FILE: pages/teacher/TeacherGrading.tsx ---
import { FC, useState, useMemo } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Save, AlertTriangle, Percent, BookOpen } from "lucide-react";

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

const modules = [
  { id: "CS305", name: "Operating Systems" },
  { id: "CS301", name: "Advanced Algorithms" },
  { id: "PH210", name: "Quantum Physics" },
];

export const TeacherGrading: FC = () => {
  const [weights, setWeights] = useState({
    control: 30,
    project: 20,
    finalExam: 50,
  });
  const [grades, setGrades] = useState(mockStudents);
  const [selectedModule, setSelectedModule] = useState(modules[0].id);

  const totalWeight = useMemo(
    () => weights.control + weights.project + weights.finalExam,
    [weights]
  );

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Grade Management"
        description="Set grade weights and enter scores for your students."
      />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2 h-5 w-5" /> Grade Weighting Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-1">
            <label
              htmlFor="module-select"
              className="block text-sm font-medium mb-1"
            >
              Module
            </label>
            <select
              id="module-select"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full input-style"
            >
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2 col-span-1 md:col-span-3">
            <label className="block text-sm font-medium mb-1">
              Weight Distribution (%)
            </label>
            <div className="grid grid-cols-3 gap-4">
              <input
                aria-label="Control weight"
                type="number"
                value={weights.control}
                onChange={(e) => handleWeightChange("control", e.target.value)}
                className="w-full input-style"
                placeholder="Control"
              />
              <input
                aria-label="Project weight"
                type="number"
                value={weights.project}
                onChange={(e) => handleWeightChange("project", e.target.value)}
                className="w-full input-style"
                placeholder="Project"
              />
              <input
                aria-label="Final Exam weight"
                type="number"
                value={weights.finalExam}
                onChange={(e) =>
                  handleWeightChange("finalExam", e.target.value)
                }
                className="w-full input-style"
                placeholder="Final Exam"
              />
            </div>
          </div>
        </div>
        {totalWeight !== 100 && (
          <div className="mt-4 flex items-center text-red-600">
            <AlertTriangle size={16} className="mr-2" /> Total weight must be
            100%. Current: {totalWeight}%.
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
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
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Save size={16} className="mr-2" />
            Submit All Grades
          </button>
        </div>
      </div>
      <style jsx>{`
        .input-style {
          display: block;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
        }
        .dark .input-style {
          background-color: #374151;
          border-color: #4b5563;
        }
      `}</style>
    </div>
  );
};
// --- END OF FILE: pages/teacher/TeacherGrading.tsx ---
