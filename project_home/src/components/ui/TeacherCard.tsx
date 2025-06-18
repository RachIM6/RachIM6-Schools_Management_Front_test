import { FC } from "react";
import { BookOpen, Mail, Phone, MoreHorizontal } from "lucide-react";
import { Teacher } from "../../types";
import Image from "next/image";

interface TeacherCardProps {
  teacher: Teacher;
}

export const TeacherCard: FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <Image
            src={teacher.avatar}
            alt={teacher.name}
            className="h-12 w-12 rounded-full object-cover"
            width={48}
            height={48}
          />

          <div className="ml-4 flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              {teacher.name}
            </h3>
            <p className="text-sm text-gray-500">{teacher.subject}</p>
          </div>

          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen size={16} className="mr-2 text-blue-500" />
            <span>{teacher.classes} Classes</span>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Phone size={16} className="mr-2" />
            Call
          </button>
          <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Mail size={16} className="mr-2" />
            Email
          </button>
        </div>
      </div>
    </div>
  );
};
