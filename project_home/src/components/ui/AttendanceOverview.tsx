import { FC } from 'react';
import { FileText, Users, Calendar, Trash2, RefreshCw } from 'lucide-react';
import { attendanceStorage } from '@/data/attendanceStorage';

interface AttendanceOverviewProps {
  onRefresh?: () => void;
}

export const AttendanceOverview: FC<AttendanceOverviewProps> = ({ onRefresh }) => {
  const stats = attendanceStorage.getStats();
  const allSessions = attendanceStorage.getAllSessions();

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all attendance data? This action cannot be undone.')) {
      attendanceStorage.clearAll();
      onRefresh?.();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Attendance Overview
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            title="Refresh data"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={handleClearAll}
            className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            title="Clear all data"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Sessions</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {stats.totalSessions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Submitted</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                {stats.submittedSessions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">Total Students</p>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                {stats.totalStudents}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-orange-600 dark:text-orange-400">Modules</p>
              <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                {stats.modules.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      {allSessions.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Recent Sessions
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allSessions
              .sort((a, b) => new Date(b.submittedAt || '').getTime() - new Date(a.submittedAt || '').getTime())
              .slice(0, 10)
              .map((session) => (
                <div
                  key={`${session.moduleInstanceId}-${session.weekId}`}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {session.weekLabel}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.students.length} students
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.submittedAt ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                        Submitted
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                        Draft
                      </span>
                    )}
                    {session.submittedAt && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(session.submittedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {allSessions.length === 0 && (
        <div className="text-center py-8">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No attendance data available yet.
          </p>
        </div>
      )}
    </div>
  );
}; 