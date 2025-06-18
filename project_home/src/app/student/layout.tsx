// --- START OF FILE: app/student/layout.tsx (SIMPLIFIED) ---
"use client";

import { Layout } from "../../components/layout/Layout";
import { StudentProvider } from "../../context/StudentContext";

export default function StudentPortalLayout({ children }: { children: React.ReactNode; }) {
  // No longer need to manage route state here, pathname handles it.
  return (
    <StudentProvider>
      {/* The `Layout` component now uses `usePathname` internally via its children */}
      <Layout userRole="student">
        {children}
      </Layout>
    </StudentProvider>
  );
}
// --- END OF FILE: app/student/layout.tsx (SIMPLIFIED) ---