"use client";

import { useEffect } from "react";
import { useRequireAuth } from "../../context/AdminContext";
import { BarChart3, Users, BookOpen, ClipboardCheck } from "lucide-react";

export default function AdminDashboardPage() {
  const { admin, isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const stats = [
    {
      name: "Total Students",
      value: "2,450",
      change: 12,
      icon: <Users className="h-6 w-6 text-indigo-500" />,
    },
    {
      name: "Total Teachers",
      value: "120",
      change: 5,
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Departments",
      value: "8",
      change: 0,
      icon: <ClipboardCheck className="h-6 w-6 text-blue-500" />,
    },
    {
      name: "Active Courses",
      value: "45",
      change: -2,
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
    },
  ];

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">{stat.icon}</div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    stat.change > 0
                      ? "text-green-600 dark:text-green-400"
                      : stat.change < 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {stat.change > 0
                    ? `${stat.change}% increase`
                    : stat.change < 0
                    ? `${Math.abs(stat.change)}% decrease`
                    : "No change"}
                </span>{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  from last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome message */}
      <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Welcome, {admin?.name}!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          This is your administration dashboard for the educational platform.
          From here, you can manage students, teachers, departments, and more.
          Use the navigation sidebar to access different sections of the admin
          panel.
        </p>
      </div>
    </div>
  );
}
