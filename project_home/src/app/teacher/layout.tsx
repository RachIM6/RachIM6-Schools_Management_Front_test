"use client";

import { Layout } from "../../components/layout/Layout";
import { TeacherProvider } from "../../context/TeacherContext";

export default function TeacherPortalLayout({ children }: { children: React.ReactNode; }) {
  return (
    <TeacherProvider>
      <Layout userRole="teacher">
        {children}
      </Layout>
    </TeacherProvider>
  );
}