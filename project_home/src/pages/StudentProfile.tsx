// --- START OF FILE: pages/StudentProfile.tsx ---

import { FC } from "react";
import { User, Mail, Phone, MapPin, Calendar, School } from "lucide-react";
import { useStudent } from "../context/StudentContext";
import { PageHeader } from "../components/ui/PageHeader";

const ProfileField: FC<{ icon: React.ReactNode; label: string; value?: string }> = ({ icon, label, value }) => (
    <div>
        <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {icon}
            <span className="ml-2">{label}</span>
        </dt>
        <dd className="mt-1 text-md text-gray-900 dark:text-white">{value || 'N/A'}</dd>
    </div>
);

export const StudentProfile: FC = () => {
    const { student } = useStudent();

    if (!student) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="space-y-8">
            <PageHeader title="My Profile" description="View and manage your personal and academic information." />

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Basic Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                         <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                             <User className="w-20 h-20 text-gray-400 dark:text-gray-500" />
                         </div>
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{student.firstName} {student.lastName}</h2>
                         <p className="text-md text-blue-600 dark:text-blue-400">{student.username}</p>
                    </div>

                    {/* Right Column: Detailed Info */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold border-b pb-2 mb-4 dark:border-gray-700">Contact & Personal Information</h3>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                                <ProfileField icon={<Mail size={16}/>} label="Email Address" value={student.email} />
                                <ProfileField icon={<Phone size={16}/>} label="Phone Number" value={student.phoneNumber} />
                                <ProfileField icon={<Calendar size={16}/>} label="Date of Birth" value={student.dateOfBirth} />
                                <ProfileField icon={<User size={16}/>} label="Gender" value={student.gender} />
                                <ProfileField icon={<MapPin size={16}/>} label="Address" value={`${student.streetAddress}, ${student.city}`} />
                                <ProfileField icon={<MapPin size={16}/>} label="Country" value={student.country} />
                            </dl>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold border-b pb-2 mb-4 dark:border-gray-700">Academic Information</h3>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                                {/* --- This is the requested field --- */}
                                <ProfileField icon={<School size={16}/>} label="Program (Filière)" value={student.filiereName} />
                                <ProfileField icon={<Calendar size={16}/>} label="Academic Year" value={student.scholarYear ? `Year ${student.scholarYear}` : undefined} />
                                <ProfileField icon={<School size={16}/>} label="Academic Status" value={student.academicStatus} />
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// --- END OF FILE: pages/StudentProfile.tsx ---