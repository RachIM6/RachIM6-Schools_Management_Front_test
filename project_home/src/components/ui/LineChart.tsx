// LineChart component
import { FC } from "react";

export const LineChart: FC = () => {
  // In a real application, this would be an actual chart implementation
  // For this demo, we'll create a visual representation with CSS

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm text-gray-500">Mathematics</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-teal-500 mr-2"></span>
            <span className="text-sm text-gray-500">Science</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></span>
            <span className="text-sm text-gray-500">English</span>
          </div>
        </div>

        <select className="border border-gray-300 rounded-md shadow-sm py-1 pl-3 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>Last 30 days</option>
          <option>Last quarter</option>
          <option>Last semester</option>
          <option>This year</option>
        </select>
      </div>

      <div className="h-60 relative">
        {/* Chart background */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="border-t border-l border-gray-100"></div>
          ))}
        </div>

        {/* Chart lines - simplified representation */}
        <div className="absolute inset-0 flex items-end px-4">
          {/* Mathematics line */}
          <div className="relative h-full w-full">
            <div
              className="absolute bottom-0 left-0 right-0 bg-blue-500/20 rounded-t-md"
              style={{ height: "65%" }}
            ></div>
            <div
              className="absolute bottom-0 left-0 right-0 border-t-2 border-blue-500"
              style={{ height: "65%" }}
            >
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          {/* Science line */}
          <div className="relative h-full w-full ml-1">
            <div
              className="absolute bottom-0 left-0 right-0 bg-teal-500/20 rounded-t-md"
              style={{ height: "80%" }}
            ></div>
            <div
              className="absolute bottom-0 left-0 right-0 border-t-2 border-teal-500"
              style={{ height: "80%" }}
            >
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-teal-500 rounded-full"></div>
            </div>
          </div>

          {/* English line */}
          <div className="relative h-full w-full ml-1">
            <div
              className="absolute bottom-0 left-0 right-0 bg-indigo-500/20 rounded-t-md"
              style={{ height: "55%" }}
            ></div>
            <div
              className="absolute bottom-0 left-0 right-0 border-t-2 border-indigo-500"
              style={{ height: "55%" }}
            >
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-indigo-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 py-2">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 inset-x-0 flex justify-between text-xs text-gray-500 pb-2 pt-1">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
        </div>
      </div>
    </div>
  );
};
