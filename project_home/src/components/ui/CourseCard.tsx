import { FC } from "react";
import { Users, Calendar, User, MoreHorizontal } from "lucide-react";
import { Course } from "../../types";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <User size={16} className="mr-2 text-blue-500" />
            <span>{course.teacher}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Users size={16} className="mr-2 text-indigo-500" />
            <span>{course.students} Students</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2 text-green-500" />
            <span>{course.schedule}</span>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View Details
          </button>
          <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Edit Course
          </button>
        </div>
      </div>
    </div>
  );
};
