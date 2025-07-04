// --- START OF FILE: pages/Login.tsx ---

import { FC, useState } from "react";
import { School } from "lucide-react";
import { HomeFooter } from "../components/layout/HomeFooter";
import { useRouter } from "next/navigation";
import { isAnyEmailVerified, hasPendingRegistration, getPendingRegistration, clearPendingRegistration } from "../utils/emailVerification";

// SIMULATED AUTHENTICATION SERVICE
// This function mimics your backend's login logic for the prototype
const simulateLogin = (username: string, role: 'student' | 'teacher') => {
  // Clear all previous login data to prevent conflicts
  localStorage.removeItem("teacher_profile");
  localStorage.removeItem("student_profile");
  localStorage.removeItem("auth_token");

  if (role === 'teacher') {
    // Define different teacher profiles based on username
    let mockTeacher;
    
    if (username.toLowerCase() === 'tabaa') {
      // Mr. Mohamed TABAA's profile
      mockTeacher = {
        keycloakId: "teacher-tabaa",
        email: "mohamed.tabaa@emsi.ma",
        firstName: "Mohamed",
        lastName: "TABAA",
        username: username,
        departmentName: "Computer Science & Engineering",
        specializations: ["Software Engineering", "Web Development", "Database Systems"],
        profileComplete: true,
      };
    } else if (username.toLowerCase() === 'turing') {
      // Dr. Alan Turing's profile
      mockTeacher = {
        keycloakId: "teacher-turing",
        email: "alan.turing@emsi.ma",
        firstName: "Alan",
        lastName: "Turing",
        username: username,
        departmentName: "Computer Science & Engineering",
        specializations: ["Algorithms", "Theoretical CS", "Cryptography"],
        profileComplete: true,
      };
    } else if (username.toLowerCase() === 'linus') {
      // Dr. Linus Torvalds' profile
      mockTeacher = {
        keycloakId: "teacher-linus",
        email: "linus.torvalds@emsi.ma",
        firstName: "Linus",
        lastName: "Torvalds",
        username: username,
        departmentName: "Computer Science & Engineering",
        specializations: ["Operating Systems", "Software Engineering"],
        profileComplete: true,
      };
    } else {
      // This should not happen since we only allow specific teacher usernames
      throw new Error("Invalid teacher username. Please use: tabaa, turing, or linus");
    }
    
    localStorage.setItem("auth_token", "fake-teacher-token-for-testing");
    localStorage.setItem("teacher_profile", JSON.stringify(mockTeacher));
  } else {
    // Calculate current scholar year based on academic year
    // Assuming students start in 2022-2023 (Year 1), then 2023-2024 (Year 2), 2024-2025 (Year 3)
    const currentYear = new Date().getFullYear();
    const startYear = 2022; // Students started in 2022-2023
    const scholarYear = Math.min(3, Math.max(1, currentYear - startYear + 1)); // Cap at 3 years, minimum 1

    const mockStudent = {
      keycloakId: "mock-student-id-123",
      email: `${username.toLowerCase()}@emsi-etu.ma`,
      firstName: username.charAt(0).toUpperCase() + username.slice(1).toLowerCase(),
      lastName: "Student",
      username: username,
      filiereName: "Computer Science Engineering",
      academicStatus: 'ACTIVE',
      scholarYear: scholarYear,
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
        
        if (username.toLowerCase() === "tabaa" || username.toLowerCase() === "turing" || username.toLowerCase() === "linus") {
          // Special password validation for Mr. TABAA
          if (username.toLowerCase() === "tabaa" && password !== "password123") {
            throw new Error("Invalid password for Mr. TABAA's account. Please use 'password123'.");
          }
          
          simulateLogin(username, 'teacher');
          router.push("/teacher/dashboard");
        } else {
          // Check if this is a newly registered student who needs email verification
          if (hasPendingRegistration(username.toLowerCase())) {
            // Check if email is verified
            if (!isAnyEmailVerified()) {
              throw new Error("Please verify your email address before signing in. Check your inbox for the verification link.");
            } else {
              // Email is verified, complete the registration
              const registrationData = getPendingRegistration();
              if (registrationData) {
                registrationData.isEmailVerified = true;
                localStorage.setItem('pending_registration', JSON.stringify(registrationData));
                
                // Create student profile from registration data
                // Calculate current scholar year based on academic year
                const currentYear = new Date().getFullYear();
                const startYear = 2022; // Students started in 2022-2023
                const scholarYear = Math.min(3, Math.max(1, currentYear - startYear + 1)); // Cap at 3 years, minimum 1

                const mockStudent = {
                  keycloakId: "mock-student-id-123",
                  email: registrationData.emailAddress,
                  firstName: registrationData.firstName,
                  lastName: registrationData.lastName,
                  username: username,
                  filiereName: registrationData.major || "Computer Science Engineering",
                  academicStatus: 'ACTIVE',
                  scholarYear: scholarYear,
                  profileComplete: true,
                  // Add other registration data
                  dateOfBirth: registrationData.dateOfBirth,
                  gender: registrationData.gender,
                  nationality: registrationData.nationality,
                  phoneNumber: registrationData.phoneNumber,
                  country: registrationData.country,
                  streetAddress: registrationData.streetAddress,
                  city: registrationData.city,
                  stateOrProvince: registrationData.stateOrProvince,
                  postalCode: registrationData.postalCode,
                };
                
                localStorage.setItem("student_token", "fake-student-token-for-testing");
                localStorage.setItem("student_profile", JSON.stringify(mockStudent));
                
                // Clear pending registration
                clearPendingRegistration();
                
                router.push("/student/dashboard");
                return;
              }
            }
          }
          
          // Regular login for existing students
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