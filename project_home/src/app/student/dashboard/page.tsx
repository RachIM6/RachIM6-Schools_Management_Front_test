// --- START OF FILE app/student/dashboard/page.tsx ---
"use client";

import { StudentDashboard } from "../../../pages/StudentDashboard";
import { useRequireStudentAuth } from "../../../context/StudentContext";

export default function StudentDashboardPage() {
  const { isLoading } = useRequireStudentAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <StudentDashboard />;
}
// --- END OF FILE app/student/dashboard/page.tsx ---