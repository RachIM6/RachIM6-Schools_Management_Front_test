"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  FC,
} from "react";
import { X, CheckCircle, AlertCircle, InfoIcon, XCircle } from "lucide-react";

// Toast Types
export type ToastType = "success" | "error" | "info" | "warning";

// Toast Interface
interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// Context Interface
interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

// Create Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Show toast
  const showToast = useCallback(
    (message: string, type: ToastType, duration = 5000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  // Hide toast
  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Toast Item Component
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onClose();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onClose]);

  // Icon based on type
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    info: <InfoIcon className="h-5 w-5 text-blue-500" />,
  };

  // Background color based on type
  const bgColors = {
    success: "bg-green-50 dark:bg-green-900/20",
    error: "bg-red-50 dark:bg-red-900/20",
    warning: "bg-yellow-50 dark:bg-yellow-900/20",
    info: "bg-blue-50 dark:bg-blue-900/20",
  };

  // Border color based on type
  const borderColors = {
    success: "border-green-400 dark:border-green-700",
    error: "border-red-400 dark:border-red-700",
    warning: "border-yellow-400 dark:border-yellow-700",
    info: "border-blue-400 dark:border-blue-700",
  };

  return (
    <div
      className={`flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow border ${
        bgColors[toast.type]
      } ${borderColors[toast.type]}`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0">
        {icons[toast.type]}
      </div>
      <div className="ml-3 text-sm font-normal text-gray-800 dark:text-gray-200">
        {toast.message}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
      >
        <span className="sr-only">Close</span>
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

// Toast Container Component
function ToastContainer() {
  const { toasts, hideToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );
}

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900';
  const borderColor = type === 'success' ? 'border-green-200 dark:border-green-700' : 'border-red-200 dark:border-red-700';
  const textColor = type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200';
  const iconColor = type === 'success' ? 'text-green-400' : 'text-red-400';

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${bgColor} border ${borderColor} rounded-lg shadow-lg`}>
      <div className="flex items-start p-4">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <CheckCircle className={`h-5 w-5 ${iconColor}`} />
          ) : (
            <XCircle className={`h-5 w-5 ${iconColor}`} />
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onClose}
            className={`inline-flex ${textColor} hover:${textColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type === 'success' ? 'green' : 'red'}-500`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
