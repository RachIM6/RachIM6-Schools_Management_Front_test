import { FC, useState } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';
import { Teacher } from '../types';
import { TeacherCard } from '../components/ui/TeacherCard';
import { PageHeader } from '../components/ui/PageHeader';

export const Staff: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Dr. Robert Chen',
      subject: 'Mathematics',
      avatar: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      classes: 5
    },
    {
      id: '2',
      name: 'Ms. Sarah Johnson',
      subject: 'English Literature',
      avatar: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      classes: 4
    },
    {
      id: '3',
      name: 'Mr. David Smith',
      subject: 'Physics',
      avatar: 'https://images.pexels.com/photos/8617942/pexels-photo-8617942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      classes: 3
    },
    {
      id: '4',
      name: 'Dr. Maria Rodriguez',
      subject: 'Biology',
      avatar: 'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      classes: 5
    },
    {
      id: '5',
      name: 'Mr. James Wilson',
      subject: 'History',
      avatar: 'https://images.pexels.com/photos/8617940/pexels-photo-8617940.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      classes: 4
    },
    {
      id: '6',
      name: 'Ms. Emily Zhang',
      subject: 'Chemistry',
      avatar: 'https://images.pexels.com/photos/5212631/pexels-photo-5212631.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      classes: 3
    }
  ];
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Staff" 
        description="Manage teachers and staff members, their assignments and schedules."
      />
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search staff..." 
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
            <UserPlus size={16} className="mr-2" />
            Add Staff
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};