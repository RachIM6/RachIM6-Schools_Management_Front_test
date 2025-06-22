// --- START OF FILE: pages/Login.tsx ---

import { FC, useState } from "react";
import { School } from "lucide-react";
import { HomeFooter } from "../components/layout/HomeFooter";
import { useRouter } from "next/navigation";

// SIMULATED AUTHENTICATION SERVICE
// This function mimics your backend's login logic for the prototype
const simulateLogin = (username: string, role: 'student' | 'teacher') => {
  // Clear all previous login data to prevent conflicts
  localStorage.removeItem("teacher_profile");
  localStorage.removeItem("student_profile");
  localStorage.removeItem("auth_token");

  if (role === 'teacher') {
    const mockTeacher = {
      keycloakId: "mock-prof-id-456",
      email: `${username.toLowerCase()}@emsi.ma`,
      firstName: "Mohamed",
      lastName: "TABAA",
      username: username,
      departmentName: "Computer Science & Engineering",
      specializations: ["Algorithms", "Theoretical CS", "Cryptography"],
      profileComplete: true,
    };
    localStorage.setItem("auth_token", "fake-teacher-token-for-testing");
    localStorage.setItem("teacher_profile", JSON.stringify(mockTeacher));
  } else {
    const mockStudent = {
      keycloakId: "mock-student-id-123",
      email: `${username.toLowerCase()}@emsi-etu.ma`,
      firstName: "Hamza",
      lastName: "Ouadou",
      username: username,
      filiereName: "Computer Science Engineering",
      academicStatus: 'ACTIVE',
      scholarYear: 3,
      profileComplete: true,
    };
    localStorage.setItem("student_token", "fake-student-token-for-testing");
    localStorage.setItem("student_profile", JSON.stringify(mockStudent));
  }
};

export const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      try {
        if (password === '') {
          throw new Error("Password cannot be empty.");
        }
        
        if (username.toLowerCase().includes("prof")) {
          simulateLogin(username, 'teacher');
          router.push("/teacher/dashboard");
        } else {
          simulateLogin(username, 'student');
          router.push("/student/dashboard");
        }
      } catch (err: any) {
        setError(err.message || "Invalid credentials.");
        setIsLoading(false); // Make sure to reset loading state on error
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
             <div className="inline-flex items-center cursor-pointer" onClick={() => router.push('/')}>
               <School className="h-10 w-10 text-blue-600 dark:text-blue-400" />
               <span className="ml-2 text-2xl font-bold dark:text-white">EMSI-School</span>
             </div>
            <h2 className="mt-8 text-3xl font-extrabold dark:text-white">Portal Sign In</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg px-8 py-10 mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (<div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{error}</div>)}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                <input id="username" name="username" type="text" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" placeholder="your.username" disabled={isLoading}/>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" placeholder="••••••••" disabled={isLoading}/>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};
// --- END OF FILE: pages/Login.tsx ---