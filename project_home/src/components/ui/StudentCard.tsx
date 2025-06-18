import { FC } from "react";
import { Check, MoreHorizontal, BookOpen, PieChart } from "lucide-react";
import { Student } from "../../types";
import Image from "next/image";

interface StudentCardProps {
  student: Student;
}

export const StudentCard: FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <Image
            src={student.avatar}
            alt={student.name}
            className="h-12 w-12 rounded-full object-cover"
            width={48}
            height={48}
          />

          <div className="ml-4 flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              {student.name}
            </h3>
            <p className="text-sm text-gray-500">{student.grade}</p>
          </div>

          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-2" />
              <span className="text-sm text-gray-500">Attendance</span>
            </div>
            <div className="mt-1">
              <span className="text-lg font-semibold text-gray-900">
                {student.attendance}%
              </span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center">
              <PieChart size={16} className="text-blue-500 mr-2" />
              <span className="text-sm text-gray-500">Performance</span>
            </div>
            <div className="mt-1">
              <span className="text-lg font-semibold text-gray-900">
                {student.performance}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <BookOpen size={16} className="mr-2" />
            View Profile
          </button>
          <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};
