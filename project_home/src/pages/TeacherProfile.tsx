// --- START OF FILE: pages/teacher/TeacherProfile.tsx ---

import { FC } from "react";
import { User, Mail, Phone, Book, GraduationCap, Building } from "lucide-react";
import { useTeacher } from "@/context/TeacherContext";
import { PageHeader } from "@/components/ui/PageHeader";

const ProfileField: FC<{ icon: React.ReactNode; label: string; value?: string | string[] }> = ({ icon, label, value }) => (
    <div>
        <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {icon}
            <span className="ml-2">{label}</span>
        </dt>
        <dd className="mt-1 text-md text-gray-900 dark:text-white">
            {Array.isArray(value) ? value.join(', ') : (value || 'N/A')}
        </dd>
    </div>
);

export const TeacherProfile: FC = () => {
    const { teacher } = useTeacher();
    if (!teacher) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            <PageHeader title="My Profile" description="Your professional and personal information." />

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                         <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                             <User className="w-20 h-20 text-gray-400 dark:text-gray-500" />
                         </div>
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prof. {teacher.firstName} {teacher.lastName}</h2>
                         <p className="text-md text-blue-600 dark:text-blue-400">{teacher.username}</p>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold border-b pb-2 mb-4 dark:border-gray-700">Contact Information</h3>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <ProfileField icon={<Mail size={16}/>} label="Email Address" value={teacher.email} />
                                <ProfileField icon={<Phone size={16}/>} label="Phone Number" value="+212 5 12 34 56 78" />
                            </dl>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold border-b pb-2 mb-4 dark:border-gray-700">Professional Information</h3>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <ProfileField icon={<Building size={16}/>} label="Department" value={teacher.departmentName} />
                                <ProfileField icon={<GraduationCap size={16}/>} label="Specializations" value={teacher.specializations} />
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// --- END OF FILE: pages/teacher/TeacherProfile.tsx ---