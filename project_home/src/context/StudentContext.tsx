// --- START OF FILE context/StudentContext.tsx ---
// MODIFIED FOR FRONTEND-ONLY SIMULATION

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

// Based on your API documentation
export interface StudentProfile {
  keycloakId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  emailVerified: boolean;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  nationality?: string;
  phoneNumber?: string;
  country?: string;
  streetAddress?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  filiereId?: number;
  filiereName?: string;
  scholarYear?: number;
  semester?: number;
  academicStatus?: "ACTIVE" | "SUSPENDED" | "GRADUATED";
  profileComplete: boolean;
}


interface StudentContextType {
  student: StudentProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refetchStudent: () => Promise<void>;
  setStudent: (student: StudentProfile) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("student_token");
    const storedStudent = localStorage.getItem("student_profile");

    if (storedToken && storedStudent) {
      setToken(storedToken);
      setStudent(JSON.parse(storedStudent));
    }
    setIsLoading(false);
  }, []);

  // --- THIS IS THE SIMULATED LOGIN FUNCTION ---
  const login = async (username: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            // In a real app, you'd call the API. Here, we just simulate it.
            // We can add simple validation for demonstration.
            if (password === "") {
                reject(new Error("Password cannot be empty."));
                return;
            }

            console.log(`Simulating login for username: ${username}`);
            
            // Create a detailed mock student profile for the UI
            const mockStudent: StudentProfile = {
                keycloakId: "mock-student-id-123",
                email: "rachid.imourigue@emsi-etu.ma",
                firstName: "Rachid", // Let's use your name for a personal touch!
                lastName: "Imourigue",
                username: username,
                emailVerified: true,
                dateOfBirth: "2002-08-10",
                gender: "MALE",
                nationality: "Moroccan",
                phoneNumber: "+212600112233",
                country: "Morocco",
                streetAddress: "123 Code Street",
                city: "Casablanca",
                stateOrProvince: "Casablanca-Settat",
                postalCode: "20000",
                filiereId: 101,
                filiereName: "Computer Science Engineering",
                scholarYear: 3,
                semester: 1,
                academicStatus: "ACTIVE",
                profileComplete: true,
            };

            const fakeToken = "fake-jwt-token-for-testing-purposes";
            
            setToken(fakeToken);
            setStudent(mockStudent);
            localStorage.setItem("student_token", fakeToken);
            localStorage.setItem("student_profile", JSON.stringify(mockStudent));
            resolve();
        }, 1000); // 1-second delay to simulate network
    });
  };

  const logout = () => {
    setStudent(null);
    setToken(null);
    localStorage.removeItem("student_token");
    localStorage.removeItem("student_profile");
    router.push("/login");
  };
  
  // This function is for later when you have a backend
  const refetchStudent = async () => {
    console.log("Simulating refetch student data. No changes made in mock mode.");
  }

  return (
    <StudentContext.Provider
      value={{
        student,
        token,
        isLoading,
        isAuthenticated: !!token && !!student,
        login,
        logout,
        refetchStudent,
        setStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
}

// Auth protection hook for student pages - This remains the same and will work with the simulation
export function useRequireStudentAuth() {
  const { isAuthenticated, isLoading, student } = useStudent();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, student, router]);

  return { student, isLoading, isAuthenticated };
}
// --- END OF FILE context/StudentContext.tsx ---