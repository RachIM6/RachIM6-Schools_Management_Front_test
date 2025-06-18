import { FC } from "react";
import { Calendar, Users, GraduationCap, Award } from "lucide-react";

export const UpcomingEvents: FC = () => {
  const events = [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      date: "May 20-21, 2025",
      icon: "Users",
    },
    {
      id: 2,
      title: "Final Exams Week",
      date: "June 10-14, 2025",
      icon: "GraduationCap",
    },
    {
      id: 3,
      title: "End of Year Ceremony",
      date: "June 15, 2025",
      icon: "Award",
    },
    {
      id: 4,
      title: "Summer Break Begins",
      date: "June 16, 2025",
      icon: "Calendar",
    },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users size={16} className="text-blue-500" />;
      case "GraduationCap":
        return <GraduationCap size={16} className="text-indigo-500" />;
      case "Award":
        return <Award size={16} className="text-amber-500" />;
      case "Calendar":
        return <Calendar size={16} className="text-green-500" />;
      default:
        return <Calendar size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="flow-root mt-3">
      <ul className="divide-y divide-gray-200">
        {events.map((event) => (
          <li key={event.id} className="py-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">{renderIcon(event.icon)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {event.title}
                </p>
                <p className="text-xs text-gray-500">{event.date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View All Events
        </button>
      </div>
    </div>
  );
};
