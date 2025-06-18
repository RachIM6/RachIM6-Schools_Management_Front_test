// --- START OF FILE: components/layout/Header.tsx ---

import { FC } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { useStudent } from "../../context/StudentContext";
import { useTeacher } from "../../context/TeacherContext";
import { Route } from "../../types";

interface HeaderProps {
  onMenuToggle: () => void;
  isMobile: boolean;
  userRole: "admin" | "student" | "teacher";
}

export const Header: FC<HeaderProps> = ({ onMenuToggle, isMobile, userRole }) => {
  let userName: string | undefined = "User";
  let userRoleDisplay = "Guest";
  let logout = () => console.log("No logout function available");

  // --- THIS IS THE CORRECTED LOGIC ---
  // Conditionally call hooks based on the explicit role
  if (userRole === "student") {
    const { student, logout: studentLogout } = useStudent();
    userName = student ? `${student.firstName} ${student.lastName}` : "Student";
    userRoleDisplay = "Student";
    logout = studentLogout;
  } else if (userRole === "teacher") {
    const { teacher, logout: teacherLogout } = useTeacher();
    userName = teacher ? `Prof. ${teacher.lastName}` : "Teacher";
    userRoleDisplay = "Teacher";
    logout = teacherLogout;
  }
  // The 'admin' case is implicitly handled if you have an admin layout that calls useAdmin
  // For safety, we avoid calling it unless explicitly in an admin context.

  return (
    <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {isMobile && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-500 dark:text-gray-300"
            >
              <Menu size={24} />
            </button>
          )}
          <div className="flex-1" /> {/* Spacer */}
          <div className="flex items-center">
            <div className="mr-3 text-right">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRoleDisplay}</p>
            </div>
            <User className="h-8 w-8 p-1.5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300" />
            <button
              onClick={logout}
              className="ml-3 p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
// --- END OF FILE: components/layout/Header.tsx ---