// --- START OF FILE: types.ts ---

import { ElementType } from 'react';

// A union of all possible page routes in the application for type safety.
export type Route =
  | "dashboard"
  | "profile"
  | "modules"
  | "grades" // Used by Student
  | "grading" // Used by Teacher
  | "attendance"
  | "schedule"
  | "planning"
  | "requests" // Used by Student
  | "justifications"; // Used by Teacher

// Defines the structure for a navigation link used in the sidebars.
export interface NavLink {
  href: string;
  label: string;
  icon: ElementType;
}

// A comprehensive Student model.
export interface Student {
  id: string;
  keycloakId?: string;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  filiereName?: string;
  scholarYear?: number;
  academicStatus?: "ACTIVE" | "SUSPENDED";
}

// A comprehensive Teacher model.
export interface Teacher {
  keycloakId?: string;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentName?: string;
  specializations?: string[];
  isDepartmentHead?: boolean; // New field to handle extra permissions
}

// Academic structure types based on French rules
export interface AcademicYear {
  id: string;
  name: string; // e.g., "2024-2025"
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Semester {
  id: string;
  name: string; // e.g., "S1", "S2"
  academicYearId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Major {
  id: string;
  name: string; // e.g., "Computer Science Engineering"
  code: string; // e.g., "CS"
  description: string;
  departmentId: string;
}

export interface Module {
  id: string;
  name: string; // e.g., "Advanced Algorithms"
  code: string; // e.g., "CS301"
  description: string;
  credits: number;
  majorId: string;
  prerequisites?: string[];
}

export interface ModuleInstance {
  id: string;
  moduleId: string;
  semesterId: string;
  teacherId: string;
  maxStudents: number;
  currentStudents: number;
  isActive: boolean;
}

export interface StudentProfile {
  keycloakId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  filiereName: string;
  academicStatus: 'ACTIVE' | 'SUSPENDED';
  scholarYear: number;
  profileComplete: boolean;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  phoneNumber?: string;
  country?: string;
  streetAddress?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
}

export interface TeacherProfile {
  keycloakId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  departmentName: string;
  specializations: string[];
  profileComplete: boolean;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

// --- END OF FILE: types.ts ---