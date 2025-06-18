// --- START OF FILE: components/layout/MobileMenu.tsx (MODIFIED) ---

import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, School, LayoutDashboard, Users, BookOpen, ClipboardCheck, Calendar, Settings, FileText, CheckSquare, BarChart2 } from "lucide-react";
import { Route } from "../../types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: Route;
  onRouteChange: (route: Route) => void;
  userRole: "admin" | "student"; // The new, crucial prop
}

// Re-define the routes here so the component is self-contained
const adminRoutes = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "staff", label: "Staff", icon: Users },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "grades", label: "Grades", icon: ClipboardCheck },
  { id: "attendance", label: "Attendance", icon: Calendar },
  { id: "communication", label: "Communication", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const studentRoutes = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "My Profile", icon: Users },
  { id: "modules", label: "My Modules", icon: BookOpen },
  { id: "grades", label: "My Grades", icon: BarChart2 },
  { id: "attendance", label: "My Attendance", icon: CheckSquare },
  { id: "schedule", label: "My Schedule", icon: Calendar },
  { id: "requests", label: "Admin Requests", icon: FileText },
];

export const MobileMenu: FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  currentRoute,
  onRouteChange,
  userRole,
}) => {
  // Choose the correct set of routes based on the user's role
  const routes = userRole === "student" ? studentRoutes : adminRoutes;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 md:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 flex z-40">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={onClose}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200 dark:border-gray-700">
                <School className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">School Portal</span>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {routes.map((route) => (
                    <button
                      key={route.id}
                      onClick={() => onRouteChange(route.id as Route)}
                      className={`w-full flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        currentRoute === route.id
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      <route.icon className="mr-4 h-6 w-6" />
                      <span>{route.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
// --- END OF FILE: components/layout/MobileMenu.tsx (MODIFIED) ---