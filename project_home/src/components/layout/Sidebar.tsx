// --- START OF FILE: components/layout/Sidebar.tsx ---

import { FC } from "react";
import {
  LayoutDashboard, Users, BookOpen, Edit, CheckSquare, Calendar, CalendarClock, FileText, School,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "../../types";

const studentRoutes: NavLink[] = [
  { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student/profile", label: "My Profile", icon: Users },
  { href: "/student/modules", label: "My Modules", icon: BookOpen },
  { href: "/student/grades", label: "My Grades", icon: Edit },
  { href: "/student/attendance", label: "My Attendance", icon: CheckSquare },
  { href: "/student/schedule", label: "My Schedule", icon: Calendar },
  { href: "/student/planning", label: "Planning", icon: CalendarClock },
  { href: "/student/requests", label: "Requests", icon: FileText },
];

const teacherRoutes: NavLink[] = [
    { href: "/teacher/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/teacher/profile", label: "My Profile", icon: Users },
    { href: "/teacher/modules", label: "My Modules", icon: BookOpen },
    { href: "/teacher/grading", label: "Grading", icon: Edit },
    { href: "/teacher/attendance", label: "Attendance", icon: CheckSquare },
    { href: "/teacher/schedule", label: "Schedule", icon: Calendar },
    { href: "/teacher/planning", label: "Planning", icon: CalendarClock },
    { href: "/teacher/justifications", label: "Justifications", icon: FileText },
];

export const Sidebar: FC<{ userRole: "student" | "teacher" }> = ({ userRole }) => {
  const pathname = usePathname();
  const routes = userRole === 'student' ? studentRoutes : teacherRoutes;

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200 dark:border-gray-700">
        <School className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
          School Portal
        </span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname.startsWith(route.href)
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <route.icon className="mr-3 h-5 w-5" />
            <span>{route.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
// --- END OF FILE: components/layout/Sidebar.tsx ---