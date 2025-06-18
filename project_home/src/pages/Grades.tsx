import { FC, useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { GradesTable } from '../components/ui/GradesTable';

export const Grades: FC = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedGrading, setSelectedGrading] = useState('midterm');

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Grades" 
        description="Manage student grades, assessments, and academic performance."
      />
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            className="border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="all">All Classes</option>
            <option value="10a">10th Grade - Section A</option>
            <option value="10b">10th Grade - Section B</option>
            <option value="11a">11th Grade - Section A</option>
            <option value="11b">11th Grade - Section B</option>
          </select>
          
          <select 
            className="border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedGrading}
            onChange={(e) => setSelectedGrading(e.target.value)}
          >
            <option value="midterm">Midterm Exam</option>
            <option value="final">Final Exam</option>
            <option value="quiz1">Quiz 1</option>
            <option value="quiz2">Quiz 2</option>
            <option value="assignment">Assignments</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Update Grades
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <GradesTable />
      </div>
    </div>
  );
};