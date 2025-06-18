import { FC } from "react";

export const GradesTable: FC = () => {
  const students = [
    {
      id: 1,
      name: "Emma Thompson",
      math: 92,
      science: 88,
      english: 95,
      history: 90,
    },
    {
      id: 2,
      name: "Michael Johnson",
      math: 78,
      science: 82,
      english: 75,
      history: 80,
    },
    {
      id: 3,
      name: "Sophia Williams",
      math: 95,
      science: 94,
      english: 92,
      history: 88,
    },
    {
      id: 4,
      name: "Daniel Brown",
      math: 85,
      science: 90,
      english: 82,
      history: 85,
    },
    {
      id: 5,
      name: "Olivia Davis",
      math: 88,
      science: 85,
      english: 90,
      history: 92,
    },
    {
      id: 6,
      name: "James Wilson",
      math: 72,
      science: 75,
      english: 78,
      history: 70,
    },
  ];

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Student
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Mathematics
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Science
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              English
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              History
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Average
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => {
            const average = Math.round(
              (student.math +
                student.science +
                student.english +
                student.history) /
                4
            );

            return (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {student.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGradeColor(
                      student.math
                    )}`}
                  >
                    {student.math}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGradeColor(
                      student.science
                    )}`}
                  >
                    {student.science}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGradeColor(
                      student.english
                    )}`}
                  >
                    {student.english}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGradeColor(
                      student.history
                    )}`}
                  >
                    {student.history}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGradeColor(
                      average
                    )}`}
                  >
                    {average}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
