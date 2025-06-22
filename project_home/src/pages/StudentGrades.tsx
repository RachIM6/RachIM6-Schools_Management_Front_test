// --- START OF FILE: pages/StudentGrades.tsx ---

import { FC, useState, useMemo } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { Download, CheckCircle, XCircle, ChevronDown, ChevronRight } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useStudent } from "../context/StudentContext";
import { 
  getModuleInstancesByStudentMajor, 
  getModuleById, 
  getTeacherById, 
  getSemesterById, 
  getAcademicYearById,
  semesters
} from '../data/academicData';
import { getMajorFromFiliereName } from '../utils/majorMapping';

// Type definitions
interface ScoreDetail {
  score: number;
  maxScore: number;
  percentage: number;
}

interface GradeDetail {
  project: ScoreDetail;
  exam: ScoreDetail;
  test: ScoreDetail;
}

interface CourseGrade {
  courseCode: string;
  courseName: string;
  teacher: string;
  score: number;
  grade: string;
  details: GradeDetail;
}

interface SemesterData {
  S1: CourseGrade[];
  S2?: CourseGrade[];
}

interface AcademicData {
  [year: string]: SemesterData;
}

// --- MOCK GRADE GENERATION FOR DEMO PURPOSES ---
function generateMockGrade(instanceId: string) {
  // Deterministic mock for demo: hash instanceId to a number
  const hash = instanceId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const base = 12 + (hash % 8); // 12-19
  const score = Math.min(20, Math.max(8, base));
  const grade = score >= 18 ? 'A+' : score >= 16 ? 'A' : score >= 14 ? 'B' : score >= 12 ? 'C' : 'D';
  return {
    score,
    grade,
    details: {
      project: { score: score - 1, maxScore: 20, percentage: 30 },
      exam: { score: score, maxScore: 20, percentage: 50 },
      test: { score: score - 2, maxScore: 20, percentage: 20 }
    }
  };
}

export const StudentGrades: FC = () => {
  const { student } = useStudent();

  // State for selection MUST be declared before useMemo hooks that use it
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const studentMajor = useMemo(() => student?.filiereName ? getMajorFromFiliereName(student.filiereName) : null, [student?.filiereName]);

  // Build a map: { [year]: { [semester]: CourseGrade[] } }
  const dynamicAcademicData = useMemo(() => {
    if (!studentMajor) return {};
    const data: Record<string, Record<string, CourseGrade[]>> = {};
    
    // Iterate over all semesters to find module instances for the student's major
    semesters.forEach(semester => {
      const instances = getModuleInstancesByStudentMajor(studentMajor.id, semester.id);
      if (instances.length === 0) return;
      
      const academicYear = getAcademicYearById(semester.academicYearId);
      if (!academicYear) return;

      if (!data[academicYear.name]) {
        data[academicYear.name] = {};
      }
      if (!data[academicYear.name][semester.name]) {
        data[academicYear.name][semester.name] = [];
      }
      
      instances.forEach(instance => {
        const module = getModuleById(instance.moduleId);
        const teacher = getTeacherById(instance.teacherId);
        if (!module || !teacher) return;
        
        const mock = generateMockGrade(instance.id);
        data[academicYear.name][semester.name].push({
          courseCode: module.code,
          courseName: module.name,
          teacher: `${teacher.firstName} ${teacher.lastName}`,
          score: mock.score,
          grade: mock.grade,
          details: mock.details
        });
      });
    });
    return data;
  }, [studentMajor]);

  // Get sorted years and semesters
  const availableYears = useMemo(() => Object.keys(dynamicAcademicData).sort((a, b) => b.localeCompare(a)), [dynamicAcademicData]);
  
  const availableSemesters = useMemo(() => {
    if (!selectedYear || !dynamicAcademicData[selectedYear]) return [];
    return Object.keys(dynamicAcademicData[selectedYear]).sort((a, b) => a.localeCompare(b));
  }, [dynamicAcademicData, selectedYear]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year);
    setSelectedSemester("");
    setExpandedCourse(null);
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
    setExpandedCourse(null);
  };

  const toggleCourseExpansion = (courseCode: string) => {
    setExpandedCourse(expandedCourse === courseCode ? null : courseCode);
  };

  // Use useMemo to get the grades to display
  const gradesToDisplay = useMemo(() => {
    if (selectedYear && selectedSemester) {
      return dynamicAcademicData[selectedYear]?.[selectedSemester] || [];
    }
    return [];
  }, [selectedYear, selectedSemester, dynamicAcademicData]);

  const exportTranscript = () => {
    if (!selectedYear || !selectedSemester || gradesToDisplay.length === 0) return;

    setIsExporting(true);

    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("ACADEMIC TRANSCRIPT", 105, 20, { align: "center" });
      
      // Student Info
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const studentName = student ? `${student.firstName} ${student.lastName}` : "Unknown Student";
      const studentId = student?.keycloakId || "Unknown ID";
      doc.text("Student Name: " + studentName, 20, 35);
      doc.text("Student ID: " + studentId, 20, 42);
      doc.text("Academic Year: " + selectedYear, 20, 49);
      doc.text("Semester: " + selectedSemester, 20, 56);
      doc.text("Date: " + new Date().toLocaleDateString(), 20, 63);
      
      // Table data
      const tableData = gradesToDisplay.map(grade => [
        grade.courseCode,
        grade.courseName,
        grade.teacher,
        `${grade.score}/20`,
        grade.grade,
        grade.score >= 10 ? "Pass" : "Fail"
      ]);

      // Create table
      autoTable(doc, {
        head: [["Course Code", "Course Name", "Teacher", "Score", "Grade", "Status"]],
        body: tableData,
        startY: 75,
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      // Detailed scores section
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Detailed Score Breakdown", 20, finalY);
      
      let currentY = finalY + 10;
      
      gradesToDisplay.forEach((grade, index) => {
        if (currentY > 250) {
          doc.addPage();
          currentY = 20;
        }
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(`${grade.courseCode} - ${grade.courseName}`, 20, currentY);
        currentY += 8;
        
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(`Test: ${grade.details.test.score}/${grade.details.test.maxScore} (${grade.details.test.percentage}%)`, 25, currentY);
        currentY += 5;
        doc.text(`Project: ${grade.details.project.score}/${grade.details.project.maxScore} (${grade.details.project.percentage}%)`, 25, currentY);
        currentY += 5;
        doc.text(`Exam: ${grade.details.exam.score}/${grade.details.exam.maxScore} (${grade.details.exam.percentage}%)`, 25, currentY);
        currentY += 10;
      });

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
      }

      // Download the PDF
      const fileName = `transcript_${selectedYear}_${selectedSemester}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="My Grades" description="Review your academic performance and scores for each course." />

      {/* --- New Filtering UI --- */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Filter Grades</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Year Selector */}
          <div>
            <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">1. Select Academic Year</label>
            <select id="year-select" value={selectedYear} onChange={handleYearChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="" disabled>-- Choose a year --</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Semester Selector (Conditional) */}
          {selectedYear && (
            <div>
              <label htmlFor="semester-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">2. Select Semester</label>
              <select id="semester-select" value={selectedSemester} onChange={handleSemesterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="" disabled>-- Choose a semester --</option>
                {availableSemesters.map(semester => (
                  <option key={semester} value={semester}>Semester {semester.substring(1)}</option>
                ))}
              </select>
            </div>
          )}

          {/* Export Button (Conditional) */}
          <div className="md:text-right">
            <button 
              disabled={gradesToDisplay.length === 0 || isExporting} 
              onClick={exportTranscript}
              className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} className="mr-2" />
              {isExporting ? "Generating..." : "Export Transcript"}
            </button>
          </div>
        </div>
      </div>

      {/* --- Grades Table (Conditional) --- */}
      {gradesToDisplay.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-8"></th>
                  <th scope="col" className="px-6 py-3">Course Code</th>
                  <th scope="col" className="px-6 py-3">Course Name</th>
                  <th scope="col" className="px-6 py-3">Teacher</th>
                  <th scope="col" className="px-6 py-3 text-center">Score</th>
                  <th scope="col" className="px-6 py-3 text-center">Grade</th>
                  <th scope="col" className="px-6 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {gradesToDisplay.map((grade: CourseGrade) => (
                  <>
                    <tr key={grade.courseCode} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => toggleCourseExpansion(grade.courseCode)}>
                      <td className="px-6 py-4">
                        {expandedCourse === grade.courseCode ? (
                          <ChevronDown size={16} className="text-blue-600 dark:text-blue-400" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400" />
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{grade.courseCode}</td>
                      <td className="px-6 py-4">{grade.courseName}</td>
                      <td className="px-6 py-4">{grade.teacher}</td>
                      <td className="px-6 py-4 text-center font-mono">{grade.score}/20</td>
                      <td className="px-6 py-4 text-center font-bold">{grade.grade}</td>
                      <td className="px-6 py-4 text-center">
                        {grade.score >= 10 ? (
                          <span className="inline-flex items-center text-green-600 dark:text-green-400"><CheckCircle size={16} className="mr-1"/> Pass</span>
                        ) : (
                          <span className="inline-flex items-center text-red-600 dark:text-red-400"><XCircle size={16} className="mr-1"/> Fail</span>
                        )}
                      </td>
                    </tr>
                    {expandedCourse === grade.courseCode && (
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Score Breakdown</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                                <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Test Score</h5>
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                  {grade.details.test.score}/{grade.details.test.maxScore}
                                </div>
                                <div className="text-sm text-purple-700 dark:text-purple-300">
                                  {grade.details.test.percentage}%
                                </div>
                              </div>
                              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Project Score</h5>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                  {grade.details.project.score}/{grade.details.project.maxScore}
                                </div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">
                                  {grade.details.project.percentage}%
                                </div>
                              </div>
                              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">Exam Score</h5>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                  {grade.details.exam.score}/{grade.details.exam.maxScore}
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300">
                                  {grade.details.exam.percentage}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <ChevronDown className="mx-auto h-12 w-12 text-gray-400"/>
            <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No Grades to Display</h3>
            <p className="mt-1 text-sm text-gray-500">Please make a selection above to view your grades.</p>
        </div>
      )}
    </div>
  );
};
// --- END OF FILE: pages/StudentGrades.tsx ---