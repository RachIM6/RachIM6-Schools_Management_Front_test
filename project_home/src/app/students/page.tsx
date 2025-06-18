"use client";

import { Students } from "../../pages/Students";
import { Layout } from "../../components/layout/Layout";

export default function StudentsPage() {
  return (
    <Layout currentRoute="students" onRouteChange={() => {}}>
      <Students />
    </Layout>
  );
}
