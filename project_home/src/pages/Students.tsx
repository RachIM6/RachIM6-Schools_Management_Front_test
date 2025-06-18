import { FC, useState } from 'react';
import { Search, Plus, Filter, UserPlus } from 'lucide-react';
import { Student } from '../types';
import { StudentCard } from '../components/ui/StudentCard';
import { PageHeader } from '../components/ui/PageHeader';

export const Students: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
  const students: Student[] = [
    {
      id: '1',
      name: 'Emma Thompson',
      grade: '10th Grade',
      avatar: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      attendance: 96,
      performance: 92
    },
    {
      id: '2',
      name: 'Michael Johnson',
      grade: '9th Grade',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      attendance: 89,
      performance: 85
    },
    {
      id: '3',
      name: 'Sophia Williams',
      grade: '11th Grade',
      avatar: 'https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      attendance: 94,
      performance: 90
    },
    {
      id: '4',
      name: 'Daniel Brown',
      grade: '12th Grade',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      attendance: 98,
      performance: 95
    },
    {
      id: '5',
      name: 'Olivia Davis',
      grade: '10th Grade',
      avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      attendance: 91,
      performance: 88
    },
    {
      id: '6',
      name: 'James Wilson',
      grade: '9th Grade',
      avatar: 'https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      attendance: 85,
      performance: 79
    }
  ];
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Students" 
        description="Manage student profiles, attendance, and academic records."
      />
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students..." 
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
            Add Student
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
};