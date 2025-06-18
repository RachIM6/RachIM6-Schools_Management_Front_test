import { FC } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { AttendanceTable } from '../components/ui/AttendanceTable';

export const Attendance: FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance" 
        description="Track and manage student attendance records."
      />
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-medium text-gray-900 mx-4 flex items-center">
              <Calendar size={18} className="mr-2 text-blue-600" />
              May 15, 2025
            </h2>
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Classes</option>
              <option>10th Grade - Section A</option>
              <option>10th Grade - Section B</option>
              <option>11th Grade - Section A</option>
              <option>11th Grade - Section B</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Take Attendance
            </button>
          </div>
        </div>
        
        <AttendanceTable />
      </div>
    </div>
  );
};