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
// --- END OF FILE: types.ts ---