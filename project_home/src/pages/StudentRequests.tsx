// --- START OF FILE: pages/StudentRequests.tsx ---

import { FC, useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { NewRequestModal } from "../components/ui/NewRequestModal";
import { PlusCircle, Eye } from "lucide-react";

const mockRequests = [
  { id: 4, type: "Demander une attestation de réussite", status: "Approved", date: "2024-06-10", resolutionDate: "2024-06-11" },
  { id: 3, type: "Envoyer un justificatif d'absence", status: "Approved", date: "2024-05-28", resolutionDate: "2024-05-29" },
  { id: 2, type: "Demander un relevé de notes", status: "Pending", date: "2024-05-20", resolutionDate: null },
  { id: 1, type: "Demander une attestation de scolarité", status: "Rejected", date: "2024-05-15", resolutionDate: "2024-05-16" },
];

const getStatusChip = (status: string) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'Rejected':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
}

export const StudentRequests: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div className="space-y-6">
            <NewRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
            <PageHeader 
                title="Administrative Requests" 
                description="Track your submitted requests and create new ones here." 
            />

            <div className="text-right">
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusCircle size={16} className="mr-2"/>
                    Make a New Request
                </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Request ID</th>
                                <th scope="col" className="px-6 py-3">Request Type</th>
                                <th scope="col" className="px-6 py-3">Submission Date</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Resolution Date</th>
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockRequests.map(req => (
                                <tr key={req.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-mono text-gray-700 dark:text-gray-300">#{req.id.toString().padStart(4, '0')}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{req.type}</td>
                                    <td className="px-6 py-4">{req.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusChip(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{req.resolutionDate || 'N/A'}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                                            <Eye size={16}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
// --- END OF FILE: pages/StudentRequests.tsx ---