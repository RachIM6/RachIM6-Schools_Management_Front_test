// --- START OF FILE: pages/teacher/TeacherJustifications.tsx ---
import { FC, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  Calendar,
  Clock,
  FileText,
  Upload,
  Plus,
  Trash2,
  FileCheck2,
  Download,
} from "lucide-react";

type JustificationType = "MEDICAL" | "PERSONAL" | "ADMINISTRATIVE" | "OTHER";

interface Justification {
  id: string;
  date: string;
  type: JustificationType;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  attachment: string | null;
  submittedAt: string;
}

const mockJustifications: Justification[] = [
  {
    id: "j1",
    date: "2025-06-10",
    type: "MEDICAL",
    description: "Medical appointment at Al Farabi Hospital",
    status: "PENDING",
    attachment: "medical_certificate.pdf",
    submittedAt: "2025-06-08T10:30:00",
  },
  {
    id: "j2",
    date: "2025-05-25",
    type: "ADMINISTRATIVE",
    description: "Required to attend professional development workshop",
    status: "APPROVED",
    attachment: "workshop_invitation.pdf",
    submittedAt: "2025-05-20T14:15:00",
  },
  {
    id: "j3",
    date: "2025-04-15",
    type: "PERSONAL",
    description: "Family emergency",
    status: "REJECTED",
    attachment: null,
    submittedAt: "2025-04-14T08:45:00",
  },
];

export const TeacherJustifications: FC = () => {
  const [justifications, setJustifications] =
    useState<Justification[]>(mockJustifications);
  const [showForm, setShowForm] = useState(false);
  const [newJustification, setNewJustification] = useState<{
    date: string;
    type: JustificationType;
    description: string;
    attachment: File | null;
  }>({
    date: new Date().toISOString().split("T")[0],
    type: "MEDICAL",
    description: "",
    attachment: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewJustification((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewJustification((prev) => ({
        ...prev,
        attachment: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would upload the file and send the data to your backend
    const newId = `j${justifications.length + 1}`;

    const newItem: Justification = {
      id: newId,
      date: newJustification.date,
      type: newJustification.type,
      description: newJustification.description,
      status: "PENDING",
      attachment: newJustification.attachment
        ? newJustification.attachment.name
        : null,
      submittedAt: new Date().toISOString(),
    };

    setJustifications((prev) => [newItem, ...prev]);
    setShowForm(false);
    setNewJustification({
      date: new Date().toISOString().split("T")[0],
      type: "MEDICAL",
      description: "",
      attachment: null,
    });

    alert("Justification submitted successfully!");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "REJECTED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Absence Justifications"
        description="Submit and track your absence justifications for administrative approval."
      />

      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {showForm ? (
            "Cancel"
          ) : (
            <>
              <Plus size={16} className="mr-2" /> New Justification
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">
            Submit New Absence Justification
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium mb-1"
                >
                  Absence Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={newJustification.date}
                    onChange={handleInputChange}
                    className="pl-10 w-full input-style"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium mb-1"
                >
                  Justification Type
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={newJustification.type}
                  onChange={handleInputChange}
                  className="w-full input-style"
                >
                  <option value="MEDICAL">Medical</option>
                  <option value="PERSONAL">Personal</option>
                  <option value="ADMINISTRATIVE">Administrative</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={newJustification.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full input-style"
                placeholder="Please provide details about your absence..."
              />
            </div>

            <div>
              <label
                htmlFor="attachment"
                className="block text-sm font-medium mb-1"
              >
                Supporting Document (optional)
              </label>
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Upload size={16} className="inline mr-2" />
                  <span>Choose File</span>
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {newJustification.attachment
                    ? newJustification.attachment.name
                    : "No file chosen"}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <FileCheck2 size={16} className="mr-2" /> Submit Justification
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <h3 className="text-lg font-medium p-4 border-b dark:border-gray-700">
          Your Justification History
        </h3>

        {justifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p>You haven't submitted any justifications yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                  <th className="px-6 py-3 font-medium">Attachment</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {justifications.map((justification) => (
                  <tr
                    key={justification.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4">{justification.date}</td>
                    <td className="px-6 py-4">
                      {justification.type.charAt(0) +
                        justification.type.slice(1).toLowerCase()}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {justification.description}
                    </td>
                    <td className="px-6 py-4">
                      {justification.attachment ? (
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                        >
                          <Download size={16} className="mr-1" />{" "}
                          {justification.attachment}
                        </a>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          justification.status
                        )}`}
                      >
                        {justification.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(justification.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .input-style {
          display: block;
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
        }
        .dark .input-style {
          background-color: #374151;
          border-color: #4b5563;
          color: #fff;
        }
      `}</style>
    </div>
  );
};
// --- END OF FILE: pages/teacher/TeacherJustifications.tsx ---
