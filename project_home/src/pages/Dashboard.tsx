import { FC } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  ArrowRight,
  Award,
  Calendar,
} from "lucide-react";
import { StatCard } from "../components/ui/StatCard";
import { LineChart } from "../components/ui/LineChart";
import { RecentActivity } from "../components/ui/RecentActivity";
import { UpcomingEvents } from "../components/ui/UpcomingEvents";
import { Stat } from "../types";

export const Dashboard: FC = () => {
  const stats: Stat[] = [
    {
      name: "Total Students",
      value: 1257,
      change: 12.5,
      icon: "User",
    },
    {
      name: "Total Courses",
      value: 42,
      change: 5.2,
      icon: "BookOpen",
    },
    {
      name: "Attendance Rate",
      value: "94%",
      change: 3.1,
      icon: "ClipboardCheck",
    },
    {
      name: "Overall GPA",
      value: "3.5",
      change: 0.2,
      icon: "TrendingUp",
    },
  ];

  const renderStatIcon = (iconName: string) => {
    switch (iconName) {
      case "User":
        return <Users className="h-6 w-6" />;
      case "BookOpen":
        return <BookOpen className="h-6 w-6" />;
      case "ClipboardCheck":
        return <ClipboardCheck className="h-6 w-6" />;
      case "TrendingUp":
        return <TrendingUp className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  return (
    <div>
      {/* Hero Section - Commented out
      <div className="relative bg-blue-600 overflow-hidden mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-blue-600 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Welcome to</span>
                  <span className="block text-blue-200">EMSI-School</span>
                </h1>
                <p className="mt-3 text-base text-blue-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Empowering education through seamless management and
                  insightful analytics. Transform your school's administrative
                  experience today.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      */}

      {/* Key Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Comprehensive School Management
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Everything you need to manage your educational institution
              efficiently and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                name={stat.name}
                value={stat.value}
                change={stat.change}
                icon={renderStatIcon(stat.icon)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 bg-white overflow-hidden shadow-lg rounded-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Academic Performance Trends
                  </h3>
                  <select className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>Last 6 Months</option>
                    <option>Last Quarter</option>
                    <option>This Year</option>
                  </select>
                </div>
                <LineChart />
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-lg rounded-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upcoming Events
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View Calendar
                  </button>
                </div>
                <UpcomingEvents />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-lg rounded-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View All
                </button>
              </div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Commented out
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">
                  EMSI-School
                </span>
              </div>
              <p className="mt-4 text-gray-400">
                Empowering educational institutions with modern management tools
                and analytics.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Students
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Staff
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Courses
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              © 2025 EMSI-School. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      */}
    </div>
  );
};
