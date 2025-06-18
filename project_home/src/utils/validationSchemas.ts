import { z } from "zod";

// Admin form schema
export const adminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["super-admin", "sub-admin"], {
    required_error: "Please select a role",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
});

// Student form schema
export const studentSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  departmentId: z.string().min(1, "Please select a department"),
  enrollmentDate: z.string().min(1, "Please select an enrollment date"),
  profilePicture: z.string().optional(),
  isActive: z.boolean().default(true),
});

// Teacher form schema
export const teacherSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  departmentId: z.string().min(1, "Please select a department"),
  hireDate: z.string().min(1, "Please select a hire date"),
  profilePicture: z.string().optional(),
  status: z.enum(["active", "on-leave"], {
    required_error: "Please select a status",
  }),
});

// Department form schema
export const departmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  headOfDepartmentId: z.string().min(1, "Please select a head of department"),
});

// Schedule entry form schema
export const scheduleEntrySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  startDateTime: z.string().min(1, "Please select a start date and time"),
  endDateTime: z.string().min(1, "Please select an end date and time"),
  assignedTo: z.string().min(1, "Please select an assignee"),
  assigneeType: z.enum(["teacher", "department"], {
    required_error: "Please select an assignee type",
  }),
  location: z.string().min(2, "Location must be at least 2 characters"),
});

// Internship agent form schema
export const internshipAgentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  office: z.string().min(2, "Office must be at least 2 characters"),
});

// Recovery agent form schema
export const recoveryAgentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  departmentId: z.string().min(1, "Please select a department"),
});

// Student assignment form schema
export const studentAssignmentSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  agentId: z.string().min(1, "Please select an agent"),
  agentType: z.enum(["internship", "recovery"], {
    required_error: "Please select an agent type",
  }),
});
