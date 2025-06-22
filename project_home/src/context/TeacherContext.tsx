// --- START OF NEW FILE: context/TeacherContext.tsx ---

"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface TeacherProfile {
  keycloakId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber?: string;
  departmentName?: string;
  specializations: string[];
  profileComplete: boolean;
}

interface TeacherContextType {
  teacher: TeacherProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setTeacher: (teacher: TeacherProfile | null) => void;
  logout: () => void;
  // Login will be handled by the main AuthProvider, this context just holds state
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedTeacher = localStorage.getItem("teacher_profile");
    if (storedTeacher) {
      setTeacher(JSON.parse(storedTeacher));
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    setTeacher(null);
    localStorage.removeItem("teacher_profile");
    localStorage.removeItem("auth_token"); // Use a generic token name
    router.push("/login");
  };

  return (
    <TeacherContext.Provider value={{ teacher, isLoading, isAuthenticated: !!teacher, setTeacher, logout }}>
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeacher() {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error("useTeacher must be used within a TeacherProvider");
  }
  return context;
}

export function useRequireTeacherAuth() {
  const { isAuthenticated, isLoading } = useTeacher();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}

// --- END OF NEW FILE: context/TeacherContext.tsx ---