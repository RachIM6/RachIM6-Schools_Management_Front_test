// --- START OF FILE: components/ui/NewRequestModal.tsx ---

import { FC, Fragment, useState, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FilePlus, Upload, Paperclip, X } from 'lucide-react';

const requestTypes = [
  "Demander un relevé de notes",
  "Demander une attestation de scolarité",
  "Envoyer un justificatif d'absence", // Requires upload
  "Faire une demande de stage",
  "Demander une date de soutenance", // Requires upload
  "Demander le renouvellement de carte étudiante",
  "Demander l’etat de paiement",
  "Demander une attestation de réussite",
  "Demander une attestation de fin de stage",
  "Demander un changement d'information",
  "Demander le Diplome",
  "Demander une autorisation exceptionnelle",
];

// --- Define which request types require a file upload ---
const UPLOAD_REQUIRED_TYPES = new Set([
  "Envoyer un justificatif d'absence",
  "Demander une date de soutenance",
]);

export const NewRequestModal: FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState(requestTypes[0]);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // This memoized value determines if the file input should be shown
  const requiresFileUpload = useMemo(() => UPLOAD_REQUIRED_TYPES.has(selectedType), [selectedType]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Simulating Request Submission:", { type: selectedType, description, file: file });
    alert("Your request has been submitted (simulated).");
    
    // Reset form and close
    setDescription('');
    setSelectedType(requestTypes[0]);
    setFile(null);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900 dark:text-white flex items-center">
                  <FilePlus className="mr-3 h-6 w-6 text-blue-500"/>
                  New Administrative Request
                </Dialog.Title>
                
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Request Type</label>
                    <select id="requestType" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {requestTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description / Justification</label>
                    <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Please provide any relevant details for your request." required />
                  </div>
                  
                  {/* --- CONDITIONAL FILE UPLOAD SECTION --- */}
                  {requiresFileUpload && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Attachment (Required)</label>
                      
                      {/* --- Display selected file or the upload button --- */}
                      {file ? (
                        <div className="mt-2 flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                          <div className="flex items-center">
                            <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <div className="ml-3 text-sm">
                                <p className="font-medium text-gray-800 dark:text-gray-200">{file.name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button type="button" onClick={() => setFile(null)} className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="file-upload" className="mt-1 flex justify-center w-full px-6 py-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <span>Upload a file</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOCX, PNG, JPG up to 10MB</p>
                            </div>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} required accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                        </label>
                      )}
                    </div>
                  )}

                  <div className="pt-6 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800" onClick={onClose}>
                      Cancel
                    </button>
                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
                      Submit Request
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
// --- END OF FILE: components/ui/NewRequestModal.tsx ---