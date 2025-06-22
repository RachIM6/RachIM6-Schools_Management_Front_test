// --- START OF FILE: pages/teacher/TeacherProfile.tsx ---

import { FC, useState } from "react";
import { User, Mail, Phone, Book, GraduationCap, Building, Edit, Save, X, Check } from "lucide-react";
import { useTeacher } from "@/context/TeacherContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toast } from "@/components/ui/Toast";

const ProfileField: FC<{ 
  icon: React.ReactNode; 
  label: string; 
  value?: string | string[];
  isEditing?: boolean;
  fieldName?: string;
  onChange?: (name: string, value: string) => void;
  type?: "text" | "email" | "tel" | "textarea";
}> = ({ 
  icon, 
  label, 
  value, 
  isEditing = false, 
  fieldName, 
  onChange, 
  type = "text" 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange && fieldName) {
      onChange(fieldName, e.target.value);
    }
  };

  return (
    <div>
      <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
        {icon}
        <span className="ml-2">{label}</span>
      </dt>
      <dd className="mt-1">
        {isEditing ? (
          type === "textarea" ? (
            <textarea
              value={Array.isArray(value) ? value.join(', ') : (value || '')}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          ) : (
            <input
              type={type}
              value={Array.isArray(value) ? value.join(', ') : (value || '')}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          )
        ) : (
          <span className="text-md text-gray-900 dark:text-white">
            {Array.isArray(value) ? value.join(', ') : (value || 'N/A')}
          </span>
        )}
      </dd>
    </div>
  );
};

export const TeacherProfile: FC = () => {
  const { teacher, setTeacher } = useTeacher();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedData, setEditedData] = useState<Partial<typeof teacher>>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  if (!teacher) return <div>Loading...</div>;

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleEdit = () => {
    setEditedData({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      phoneNumber: teacher.phoneNumber || '',
      departmentName: teacher.departmentName || '',
      specializations: teacher.specializations || [],
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedData({});
    setIsEditing(false);
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [fieldName]: fieldName === 'specializations' ? value.split(',').map(s => s.trim()) : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call with random loading time between 1-2 seconds
      const loadingTime = Math.random() * 1000 + 1000; // Random time between 1000-2000ms
      await new Promise(resolve => setTimeout(resolve, loadingTime));
      
      // Validate required fields
      if (!editedData?.firstName?.trim() || !editedData?.lastName?.trim() || !editedData?.email?.trim()) {
        throw new Error('First name, last name, and email are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editedData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Update local state
      if (setTeacher) {
        setTeacher({ ...teacher, ...editedData });
      }
      
      // Update localStorage
      const updatedTeacher = { ...teacher, ...editedData };
      localStorage.setItem("teacher_profile", JSON.stringify(updatedTeacher));
      
      setIsEditing(false);
      setEditedData({});
      
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Failed to update profile:', error);
      showToast(error instanceof Error ? error.message : 'Failed to update profile. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const currentData = isEditing ? { ...teacher, ...editedData } : teacher;

  return (
    <div className="space-y-8">
      <PageHeader title="My Profile" description="Your professional and personal information." />

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
              <User className="w-20 h-20 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Prof. {currentData.firstName} {currentData.lastName}
            </h2>
            <p className="text-md text-blue-600 dark:text-blue-400">{currentData.username}</p>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-semibold border-b pb-2 mb-4 dark:border-gray-700">Personal Information</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField 
                  icon={<User size={16}/>} 
                  label="First Name" 
                  value={currentData.firstName}
                  isEditing={isEditing}
                  fieldName="firstName"
                  onChange={handleFieldChange}
                />
                <ProfileField 
                  icon={<User size={16}/>} 
                  label="Last Name" 
                  value={currentData.lastName}
                  isEditing={isEditing}
                  fieldName="lastName"
                  onChange={handleFieldChange}
                />
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold border-b pb-2 mb-4 dark:border-gray-700">Contact Information</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField 
                  icon={<Mail size={16}/>} 
                  label="Email Address" 
                  value={currentData.email}
                  isEditing={isEditing}
                  fieldName="email"
                  type="email"
                  onChange={handleFieldChange}
                />
                <ProfileField 
                  icon={<Phone size={16}/>} 
                  label="Phone Number" 
                  value={currentData.phoneNumber || "+212 5 12 34 56 78"}
                  isEditing={isEditing}
                  fieldName="phoneNumber"
                  type="tel"
                  onChange={handleFieldChange}
                />
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold border-b pb-2 mb-4 dark:border-gray-700">Professional Information</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField 
                  icon={<Building size={16}/>} 
                  label="Department" 
                  value={currentData.departmentName}
                  isEditing={isEditing}
                  fieldName="departmentName"
                  onChange={handleFieldChange}
                />
                <ProfileField 
                  icon={<GraduationCap size={16}/>} 
                  label="Specializations" 
                  value={currentData.specializations}
                  isEditing={isEditing}
                  fieldName="specializations"
                  type="textarea"
                  onChange={handleFieldChange}
                />
              </dl>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};
// --- END OF FILE: pages/teacher/TeacherProfile.tsx ---