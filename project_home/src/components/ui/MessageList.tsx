import { FC } from "react";
import { User, Search } from "lucide-react";
import Image from "next/image";

export const MessageList: FC = () => {
  const messages = [
    {
      id: 1,
      sender: "Dr. Robert Chen",
      avatar:
        "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      subject: "Mathematics Curriculum Update",
      excerpt:
        "I would like to discuss some updates to the mathematics curriculum for the next semester...",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      sender: "Ms. Sarah Johnson",
      avatar:
        "https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      subject: "English Literature Reading List",
      excerpt:
        "Here is the updated reading list for the English Literature class...",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      sender: "Parent - Michael Johnson",
      avatar: "",
      subject: "Student Absence Notification",
      excerpt:
        "Michael will be absent tomorrow due to a doctor's appointment...",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      sender: "Dr. Maria Rodriguez",
      avatar:
        "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      subject: "Science Fair Preparations",
      excerpt: "We need to start preparing for the annual science fair...",
      time: "May 10",
      unread: false,
    },
  ];

  return (
    <div className="divide-y divide-gray-200">
      <div className="pb-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Inbox</h3>

        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex p-4 hover:bg-gray-50 rounded-lg cursor-pointer ${
                message.unread ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex-shrink-0">
                {message.avatar ? (
                  <Image
                    src={message.avatar}
                    alt={message.sender}
                    className="h-10 w-10 rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                )}
              </div>

              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-sm font-medium ${
                      message.unread ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {message.sender}
                  </h4>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>

                <p
                  className={`text-sm truncate ${
                    message.unread
                      ? "font-medium text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  {message.subject}
                </p>

                <p className="text-xs text-gray-500 truncate mt-1">
                  {message.excerpt}
                </p>
              </div>

              {message.unread && (
                <div className="ml-2 flex-shrink-0">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Load More Messages
          </button>
        </div>
      </div>
    </div>
  );
};
