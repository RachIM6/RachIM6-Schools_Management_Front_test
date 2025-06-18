import { FC, useState } from "react";
import { Search, Bell, Mail, MessageCircle } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { MessageList } from "../components/ui/MessageList";
import { AnnouncementForm } from "../components/ui/AnnouncementForm";

export const Communication: FC = () => {
  const [activeTab, setActiveTab] = useState("announcements");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Communication"
        description="Send announcements, messages, and communicate with parents and students."
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("announcements")}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === "announcements"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Bell size={16} className="inline-block mr-2" />
              Announcements
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === "messages"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <MessageCircle size={16} className="inline-block mr-2" />
              Messages
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === "email"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Mail size={16} className="inline-block mr-2" />
              Email
            </button>
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "announcements" && (
            <div className="space-y-6">
              <AnnouncementForm />
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Announcements
                </h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-md font-medium">
                        End of Year Ceremony
                      </h4>
                      <span className="text-xs text-gray-500">
                        May 10, 2025
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      The End of Year Ceremony will be held on June 15th at
                      10:00 AM in the main auditorium. All parents are invited
                      to attend.
                    </p>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                        All Classes
                      </span>
                      <span className="ml-2">Sent to 1,257 recipients</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-md font-medium">
                        Parent-Teacher Conference
                      </h4>
                      <span className="text-xs text-gray-500">May 5, 2025</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Parent-Teacher Conferences will be held on May 20-21.
                      Please schedule your appointment through the parent
                      portal.
                    </p>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        10th Grade
                      </span>
                      <span className="ml-2">Sent to 256 recipients</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "messages" && <MessageList />}

          {activeTab === "email" && (
            <div className="text-center py-8">
              <Mail size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Email Integration
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Connect your email account to send emails directly from
                EMSI-School.
              </p>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect Email Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
