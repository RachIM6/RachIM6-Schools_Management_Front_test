import { FC, useState } from 'react';
import { User, School, Bell, Lock, Calendar, Database } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';

export const Settings: FC = () => {
  const [activeTab, setActiveTab] = useState('school');

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        description="Configure system settings and preferences."
      />
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="sm:flex">
          <div className="sm:w-64 border-r border-gray-200">
            <nav className="flex flex-col sm:flex-col">
              <button
                onClick={() => setActiveTab('school')}
                className={`p-4 text-sm font-medium flex items-center ${
                  activeTab === 'school'
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <School size={18} className={`mr-3 ${activeTab === 'school' ? 'text-blue-600' : 'text-gray-400'}`} />
                School Information
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`p-4 text-sm font-medium flex items-center ${
                  activeTab === 'account'
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <User size={18} className={`mr-3 ${activeTab === 'account' ? 'text-blue-600' : 'text-gray-400'}`} />
                Account Settings
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`p-4 text-sm font-medium flex items-center ${
                  activeTab === 'notifications'
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Bell size={18} className={`mr-3 ${activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-400'}`} />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`p-4 text-sm font-medium flex items-center ${
                  activeTab === 'security'
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Lock size={18} className={`mr-3 ${activeTab === 'security' ? 'text-blue-600' : 'text-gray-400'}`} />
                Security
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`p-4 text-sm font-medium flex items-center ${
                  activeTab === 'calendar'
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Calendar size={18} className={`mr-3 ${activeTab === 'calendar' ? 'text-blue-600' : 'text-gray-400'}`} />
                Academic Calendar
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`p-4 text-sm font-medium flex items-center ${
                  activeTab === 'data'
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Database size={18} className={`mr-3 ${activeTab === 'data' ? 'text-blue-600' : 'text-gray-400'}`} />
                Data Management
              </button>
            </nav>
          </div>
          
          <div className="p-6 sm:flex-1">
            {activeTab === 'school' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">School Information</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">School Name</label>
                      <input
                        type="text"
                        id="schoolName"
                        defaultValue="Westside High School"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="schoolCode" className="block text-sm font-medium text-gray-700">School Code</label>
                      <input
                        type="text"
                        id="schoolCode"
                        defaultValue="WHS-2025"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        id="address"
                        defaultValue="123 Education Ave, Academic City, AC 12345"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="text"
                        id="phone"
                        defaultValue="(555) 123-4567"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        defaultValue="info@westsidehigh.edu"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                      <input
                        type="text"
                        id="website"
                        defaultValue="www.westsidehigh.edu"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'account' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Account Settings</h3>
                {/* Account settings content */}
                <p className="text-gray-500">Update your account settings and preferences.</p>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h3>
                {/* Notifications content */}
                <p className="text-gray-500">Configure how and when you receive notifications.</p>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h3>
                {/* Security content */}
                <p className="text-gray-500">Manage your security settings and password.</p>
              </div>
            )}
            
            {activeTab === 'calendar' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Academic Calendar</h3>
                {/* Calendar content */}
                <p className="text-gray-500">Set up your academic calendar and important dates.</p>
              </div>
            )}
            
            {activeTab === 'data' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Data Management</h3>
                {/* Data management content */}
                <p className="text-gray-500">Manage your data, imports, exports, and backups.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};