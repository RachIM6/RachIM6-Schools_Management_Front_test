"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScheduleEntry } from "../../types";

interface CalendarProps {
  events: ScheduleEntry[];
  onEventClick?: (event: ScheduleEntry) => void;
  onDateClick?: (date: Date) => void;
  view: "week" | "month";
  onViewChange?: (view: "week" | "month") => void;
}

export function Calendar({
  events,
  onEventClick,
  onDateClick,
  view,
  onViewChange,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  // Generate calendar days based on view
  useEffect(() => {
    if (view === "month") {
      setCalendarDays(generateMonthDays(currentDate));
    } else {
      setCalendarDays(generateWeekDays(currentDate));
    }
  }, [currentDate, view]);

  // Navigate to previous period
  const goToPrevious = () => {
    if (view === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    }
  };

  // Navigate to next period
  const goToNext = () => {
    if (view === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    }
  };

  // Go to current date
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDateTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: view === "month" ? "long" : "short",
      year: "numeric",
      ...(view === "week" && { day: "numeric" }),
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
      {/* Calendar Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {view === "month"
              ? formatDate(currentDate)
              : `Week of ${formatDate(calendarDays[0] || currentDate)}`}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 mr-4">
            <button
              type="button"
              onClick={() => onViewChange && onViewChange("week")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                view === "week"
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => onViewChange && onViewChange("month")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                view === "month"
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Month
            </button>
          </div>
          <button
            type="button"
            onClick={goToToday}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            Today
          </button>
          <button
            type="button"
            onClick={goToPrevious}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {view === "month" ? (
          <MonthView
            days={calendarDays}
            events={events}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
            currentDate={currentDate}
          />
        ) : (
          <WeekView
            days={calendarDays}
            events={events}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
            currentDate={currentDate}
          />
        )}
      </div>
    </div>
  );
}

// Month View Component
function MonthView({
  days,
  events,
  onEventClick,
  onDateClick,
  currentDate,
}: {
  days: Date[];
  events: ScheduleEntry[];
  onEventClick?: (event: ScheduleEntry) => void;
  onDateClick?: (date: Date) => void;
  currentDate: Date;
}) {
  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDateTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is in current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          return (
            <div
              key={index}
              className={`min-h-[100px] border rounded-md ${
                isCurrentMonth(day)
                  ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  : "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-600"
              } ${
                isToday(day)
                  ? "ring-2 ring-indigo-500 dark:ring-indigo-400"
                  : ""
              }`}
              onClick={() => onDateClick && onDateClick(day)}
            >
              <div className="p-1">
                <div
                  className={`text-right text-sm font-medium ${
                    isToday(day)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : isCurrentMonth(day)
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {day.getDate()}
                </div>
                <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="px-1 py-0.5 rounded text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 truncate cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick && onEventClick(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="px-1 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Week View Component
function WeekView({
  days,
  events,
  onEventClick,
  onDateClick,
  currentDate,
}: {
  days: Date[];
  events: ScheduleEntry[];
  onEventClick?: (event: ScheduleEntry) => void;
  onDateClick?: (date: Date) => void;
  currentDate: Date;
}) {
  // Hours for the day
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Format hour for display
  const formatHour = (hour: number) => {
    return hour === 0 || hour === 12
      ? hour === 0
        ? "12 AM"
        : "12 PM"
      : hour < 12
      ? `${hour} AM`
      : `${hour - 12} PM`;
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get events for a specific date and hour
  const getEventsForHour = (date: Date, hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDateTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getHours() === hour
      );
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Day headers */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2 border-b border-gray-200 dark:border-gray-700">
            Time
          </div>
          {days.map((day, index) => (
            <div
              key={index}
              className={`text-center py-2 border-b border-gray-200 dark:border-gray-700 ${
                isToday(day) ? "bg-indigo-50 dark:bg-indigo-900/20" : ""
              }`}
            >
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div
                className={`text-sm ${
                  isToday(day)
                    ? "text-indigo-600 dark:text-indigo-400 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Hour rows */}
        <div>
          {hours.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-8 gap-1 border-b border-gray-100 dark:border-gray-800"
            >
              <div className="text-right pr-2 py-2 text-xs text-gray-500 dark:text-gray-400">
                {formatHour(hour)}
              </div>
              {days.map((day, dayIndex) => {
                const hourEvents = getEventsForHour(day, hour);
                return (
                  <div
                    key={`${hour}-${dayIndex}`}
                    className={`min-h-[60px] border-r border-gray-100 dark:border-gray-800 relative ${
                      isToday(day)
                        ? "bg-indigo-50/30 dark:bg-indigo-900/10"
                        : ""
                    }`}
                    onClick={() => {
                      if (onDateClick) {
                        const clickedDate = new Date(day);
                        clickedDate.setHours(hour);
                        onDateClick(clickedDate);
                      }
                    }}
                  >
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        className="absolute inset-x-0 mx-1 my-0.5 px-2 py-1 rounded text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 truncate cursor-pointer z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick && onEventClick(event);
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to generate days for a month view
function generateMonthDays(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1);
  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);

  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay();

  // Calculate days from previous month to show
  const daysFromPrevMonth = firstDayOfWeek;

  // Calculate total days to show (previous month + current month + next month)
  // We'll show 6 weeks (42 days) to ensure we have enough space
  const totalDays = 42;

  const days: Date[] = [];

  // Add days from previous month
  const prevMonth = new Date(year, month, 0);
  const prevMonthDays = prevMonth.getDate();

  for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
    days.push(new Date(year, month - 1, i));
  }

  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add days from next month
  const remainingDays = totalDays - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

// Helper function to generate days for a week view
function generateWeekDays(date: Date): Date[] {
  const days: Date[] = [];

  // Get the current day of the week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = date.getDay();

  // Calculate the first day of the week (Sunday)
  const firstDayOfWeek = new Date(date);
  firstDayOfWeek.setDate(date.getDate() - dayOfWeek);

  // Generate 7 days starting from the first day of the week
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    days.push(day);
  }

  return days;
}
