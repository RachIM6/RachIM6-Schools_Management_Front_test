// --- START OF NEW FILE: pages/teacher/TeacherGrading.tsx ---
import { FC, useState, useMemo, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Save, AlertTriangle, Percent, BookOpen, ChevronDown, Edit, X, Check } from "lucide-react";
import { useTeacher } from "@/context/TeacherContext";
import { 
  getModuleInstancesByTeacher,
  getModuleById,
  getMajorById,
  getSemesterById,
  getAcademicYearById,
  semesters
} from '@/data/academicData';

// Mock student list - in real app this would come from the database
const mockStudentListForSession = [
  { id: "student-1", name: "Rachid IMOURIGUE" },
  { id: "student-2", name: "Mohamed HAJJI" },
  { id: "student-3", name: "Ayoub Marghad" },
  { id: "student-4", name: "Fatima Zahra" },
  { id: "student-5", name: "Yassine Alami" },
  { id: "student-6", name: "Laila Bensouda" },
  { id: "student-7", name: "Karim Idrissi" },
  { id: "student-8", name: "Nadia Tazi" },
  { id: "student-9", name: "Omar Benjelloun" },
  { id: "student-10", name: "Salma Bakkali" },
  { id: "student-11", name: "Mehdi Chraibi" },
  { id: "student-12", name: "Amina Fassi" },
  { id: "student-13", name: "Younes Berrada" },
  { id: "student-14", name: "Hajar Mansouri" },
  { id: "student-15", name: "Zakaria Bouali" },
  { id: "student-16", name: "Soukaina Alaoui" },
  { id: "student-17", name: "Hamza Bennani" },
  { id: "student-18", name: "Imane Chaoui" },
  { id: "student-19", name: "Youssef Lahrichi" },
  { id: "student-20", name: "Zineb Moussaoui" },
  { id: "student-21", name: "Adil Tahiri" },
  { id: "student-22", name: "Houda Ziani" },
  { id: "student-23", name: "Khalid Ouazzani" },
  { id: "student-24", name: "Samira Doukkali" },
  { id: "student-25", name: "Tarik El Amrani" },
];

type StudentGradeRecord = {
  id: string;
  name: string;
  grades: {
    control: number | null;
    project: number | null;
    finalExam: number | null;
  };
};

export const TeacherGrading: FC = () => {
  const { teacher } = useTeacher();
  const [selectedModuleInstance, setSelectedModuleInstance] = useState("");
  const [students, setStudents] = useState<StudentGradeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [weights, setWeights] = useState({
    control: 30,
    project: 20,
    finalExam: 50,
  });
  const [tempWeights, setTempWeights] = useState({
    control: 30,
    project: 20,
    finalExam: 50,
  });
  const [tempGrades, setTempGrades] = useState<StudentGradeRecord[]>([]);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Get teacher's module instances
  const teacherModuleInstances = useMemo(() => {
    if (!teacher) return [];
    return getModuleInstancesByTeacher(teacher.keycloakId);
  }, [teacher]);

  // Get current semester
  const currentSemester = useMemo(() => {
    return semesters.find(semester => semester.isActive);
  }, []);

  // Filter module instances for current semester
  const currentModuleInstances = useMemo(() => {
    if (!currentSemester) return [];
    return teacherModuleInstances.filter(instance => instance.semesterId === currentSemester.id);
  }, [teacherModuleInstances, currentSemester]);

  // Get available modules with major information
  const availableModules = useMemo(() => {
    return currentModuleInstances.map(instance => {
      const module = getModuleById(instance.moduleId);
      const major = module ? getMajorById(module.majorId) : null;
      return {
        id: instance.id,
        moduleId: instance.moduleId,
        moduleName: module?.name || 'Unknown Module',
        moduleCode: module?.code || 'Unknown',
        majorName: major?.name || 'Unknown Major',
        majorCode: major?.code || 'Unknown',
        semesterId: instance.semesterId,
        isActive: instance.isActive
      };
    });
  }, [currentModuleInstances]);

  const totalWeight = useMemo(
    () => weights.control + weights.project + weights.finalExam,
    [weights]
  );

  const tempTotalWeight = useMemo(
    () => tempWeights.control + tempWeights.project + tempWeights.finalExam,
    [tempWeights]
  );

  const areAllGradesFilled = useMemo(() => {
    return students.every(student => 
      student.grades.control !== null && 
      student.grades.project !== null && 
      student.grades.finalExam !== null
    );
  }, [students]);

  const canSubmit = useMemo(() => {
    return areAllGradesFilled && tempTotalWeight === 100;
  }, [areAllGradesFilled, tempTotalWeight]);

  const handleModuleChange = (moduleInstanceId: string) => {
    setSelectedModuleInstance(moduleInstanceId);
    setStudents([]); // Clear students
    setIsSubmitted(false);
    setIsEditing(false);
  };

  const handleLoadStudents = () => {
    if (selectedModuleInstance) {
      setIsLoading(true);
      
      // Load fresh student list with no default grades
      const freshStudents = mockStudentListForSession.map(student => ({
        ...student,
        grades: {
          control: null,
          project: null,
          finalExam: null,
        }
      }));
      setStudents(freshStudents);
      setTempGrades(freshStudents);
      setIsSubmitted(false);
      setIsEditing(false);
      
      setIsLoading(false);
    }
  };

  const handleWeightChange = (type: keyof typeof weights, value: string) => {
    const numValue = parseInt(value) || 0;
    setTempWeights(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  const handleGradeChange = (
    studentId: string,
    type: "control" | "project" | "finalExam",
    value: string
  ) => {
    const numValue = value === "" ? null : parseFloat(value);
    setTempGrades(prev =>
      prev.map(student =>
        student.id === studentId
          ? {
              ...student,
              grades: {
                ...student.grades,
                [type]: numValue
              }
            }
          : student
      )
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTempGrades([...students]);
    setTempWeights({ ...weights });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempGrades([...students]);
    setTempWeights({ ...weights });
  };

  const handleSaveGrades = () => {
    setStudents(tempGrades);
    setWeights(tempWeights);
    setIsEditing(false);
    alert("Grades saved successfully!");
  };

  const handleSubmitToAdmin = () => {
    setShowSubmitConfirm(true);
  };

  const confirmSubmitToAdmin = () => {
    setIsSubmitted(true);
    setShowSubmitConfirm(false);
    alert("Grades submitted to administration successfully!");
  };

  const cancelSubmitToAdmin = () => {
    setShowSubmitConfirm(false);
  };

  const calculateFinalGrade = (g: {
    control: number | null;
    project: number | null;
    finalExam: number | null;
  }) => {
    const currentWeights = isEditing ? tempWeights : weights;
    const currentTotalWeight = isEditing ? tempTotalWeight : totalWeight;
    
    if (
      g.control === null ||
      g.project === null ||
      g.finalExam === null ||
      currentTotalWeight !== 100
    )
      return null;
    const final =
      g.control * (currentWeights.control / 100) +
      g.project * (currentWeights.project / 100) +
      g.finalExam * (currentWeights.finalExam / 100);
    return final.toFixed(2);
  };

  const selectedModuleData = availableModules.find(m => m.id === selectedModuleInstance);

  // Show loading if teacher is not loaded
  if (!teacher) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Grade Management"
        description="Set grade weights and enter scores for your students."
      />

      {/* Module Selection */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Select a Module
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          {/* Module Selection */}
          <div>
            <label
              htmlFor="module-select"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Current Teaching Module
            </label>
            <select
              id="module-select"
              value={selectedModuleInstance}
              onChange={(e) => handleModuleChange(e.target.value)}
              className="w-full input-style"
            >
              <option value="">-- Choose a module --</option>
              {availableModules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.moduleName} ({module.majorName})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleLoadStudents}
            disabled={!selectedModuleInstance || isLoading}
            className="btn-primary md:w-auto w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Load Student List"}
          </button>
        </div>
      </div>

      {/* Weight Configuration - Only show after module selection */}
      {selectedModuleInstance && students.length > 0 && (
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
                  value={isEditing ? tempWeights.control : weights.control}
                  onChange={(e) => handleWeightChange("control", e.target.value)}
                  disabled={!isEditing || isSubmitted}
                  className="w-full input-style disabled:opacity-50 disabled:cursor-not-allowed"
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
                  value={isEditing ? tempWeights.project : weights.project}
                  onChange={(e) => handleWeightChange("project", e.target.value)}
                  disabled={!isEditing || isSubmitted}
                  className="w-full input-style disabled:opacity-50 disabled:cursor-not-allowed"
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
                  value={isEditing ? tempWeights.finalExam : weights.finalExam}
                  onChange={(e) =>
                    handleWeightChange("finalExam", e.target.value)
                  }
                  disabled={!isEditing || isSubmitted}
                  className="w-full input-style disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="50"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            {(isEditing ? tempTotalWeight : totalWeight) !== 100 && (
              <div className="flex items-center text-red-600 dark:text-red-400">
                <AlertTriangle size={16} className="mr-2" /> 
                Total weight must be 100%. Current: {isEditing ? tempTotalWeight : totalWeight}%.
              </div>
            )}
            {(isEditing ? tempTotalWeight : totalWeight) === 100 && (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                Weight distribution is valid (100%).
              </div>
            )}
            {isEditing && !areAllGradesFilled && (
              <div className="flex items-center text-orange-600 dark:text-orange-400">
                <AlertTriangle size={16} className="mr-2" />
                All student scores must be filled before submitting to administration.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grade Forms - Only show after module is selected and students loaded */}
      {selectedModuleInstance && students.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Student Grades - {selectedModuleData?.moduleName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isSubmitted 
                  ? "Grades submitted to administration - No further changes allowed"
                  : isEditing 
                    ? "Editing mode - Make changes and save" 
                    : "View and manage student grades"
                }
              </p>
              {isSubmitted && (
                <div className="mt-2 flex items-center text-orange-600 dark:text-orange-400">
                  <AlertTriangle size={16} className="mr-2" />
                  <span className="text-sm font-medium">Submitted to Administration</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {!isSubmitted && !isEditing && (
                <button
                  onClick={handleEditClick}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Edit size={16} className="mr-2" />
                  Edit
                </button>
              )}
              {!isSubmitted && isEditing && (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveGrades}
                    disabled={(isEditing ? tempTotalWeight : totalWeight) !== 100}
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check size={16} className="mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleSubmitToAdmin}
                    disabled={!canSubmit}
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={16} className="mr-2" />
                    Submit to Administration
                  </button>
                </>
              )}
            </div>
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
                {(isEditing ? tempGrades : students).map((student) => {
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
                        {isEditing && !isSubmitted ? (
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
                        ) : (
                          <span className="text-gray-900 dark:text-gray-100">
                            {student.grades.control ?? "—"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing && !isSubmitted ? (
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
                        ) : (
                          <span className="text-gray-900 dark:text-gray-100">
                            {student.grades.project ?? "—"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing && !isSubmitted ? (
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
                        ) : (
                          <span className="text-gray-900 dark:text-gray-100">
                            {student.grades.finalExam ?? "—"}
                          </span>
                        )}
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
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confirm Submission
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to submit these grades to administration? 
              <strong className="text-red-600 dark:text-red-400"> This action cannot be undone.</strong>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelSubmitToAdmin}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmitToAdmin}
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
              >
                Submit to Administration
              </button>
            </div>
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
        .btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border: 1px solid transparent;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          background-color: #2563eb;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
// --- END OF FILE: pages/teacher/TeacherGrading.tsx ---
