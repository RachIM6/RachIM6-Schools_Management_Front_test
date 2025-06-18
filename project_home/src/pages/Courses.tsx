import { FC, useState } from 'react';
import { Search, Filter, Plus, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { CourseCard } from '../components/ui/CourseCard';
import { PageHeader } from '../components/ui/PageHeader';

export const Courses: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
  const courses: Course[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      teacher: 'Dr. Robert Chen',
      students: 28,
      schedule: 'Mon, Wed, Fri - 9:00 AM'
    },
    {
      id: '2',
      name: 'English Literature',
      teacher: 'Ms. Sarah Johnson',
      students: 32,
      schedule: 'Tue, Thu - 10:30 AM'
    },
    {
      id: '3',
      name: 'Physics 101',
      teacher: 'Mr. David Smith',
      students: 25,
      schedule: 'Mon, Wed - 1:00 PM'
    },
    {
      id: '4',
      name: 'Biology',
      teacher: 'Dr. Maria Rodriguez',
      students: 30,
      schedule: 'Tue, Thu - 2:30 PM'
    },
    {
      id: '5',
      name: 'World History',
      teacher: 'Mr. James Wilson',
      students: 35,
      schedule: 'Mon, Wed, Fri - 11:00 AM'
    },
    {
      id: '6',
      name: 'Chemistry',
      teacher: 'Ms. Emily Zhang',
      students: 24,
      schedule: 'Tue, Thu - 9:00 AM'
    }
  ];
  
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Courses" 
        description="Manage courses, class schedules, and curriculum."
      />
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <BookOpen size={16} className="mr-2" />
            Add Course
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};