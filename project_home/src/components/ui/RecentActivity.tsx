import { FC } from "react";
import {
  User,
  BookOpen,
  ClipboardCheck,
  Award,
  MessageCircle,
} from "lucide-react";

export const RecentActivity: FC = () => {
  const activities = [
    {
      id: 1,
      user: "Dr. Robert Chen",
      action: "posted grades for",
      target: "Advanced Mathematics Midterm",
      time: "35 minutes ago",
      icon: "Award",
    },
    {
      id: 2,
      user: "Ms. Sarah Johnson",
      action: "created a new assignment for",
      target: "English Literature",
      time: "2 hours ago",
      icon: "BookOpen",
    },
    {
      id: 3,
      user: "Admin",
      action: "updated attendance records for",
      target: "10th Grade - Section A",
      time: "3 hours ago",
      icon: "ClipboardCheck",
    },
    {
      id: 4,
      user: "Mr. David Smith",
      action: "sent an announcement to",
      target: "Physics 101 Students",
      time: "5 hours ago",
      icon: "MessageCircle",
    },
    {
      id: 5,
      user: "System",
      action: "registered a new student",
      target: "Alex Johnson",
      time: "1 day ago",
      icon: "User",
    },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "User":
        return <User size={16} />;
      case "BookOpen":
        return <BookOpen size={16} />;
      case "ClipboardCheck":
        return <ClipboardCheck size={16} />;
      case "Award":
        return <Award size={16} />;
      case "MessageCircle":
        return <MessageCircle size={16} />;
      default:
        return <User size={16} />;
    }
  };

  return (
    <div className="flow-root mt-3">
      <ul className="-mb-8">
        {activities.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index !== activities.length - 1 && (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
              )}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    <div className="text-gray-500">
                      {renderIcon(activity.icon)}
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        {activity.user}
                      </span>{" "}
                      <span className="text-gray-500">{activity.action}</span>{" "}
                      <span className="font-medium text-gray-900">
                        {activity.target}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
