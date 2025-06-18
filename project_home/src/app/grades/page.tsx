"use client";

import { Grades } from "../../pages/Grades";
import { Layout } from "../../components/layout/Layout";

export default function GradesPage() {
  return (
    <Layout currentRoute="grades" onRouteChange={() => {}}>
      <Grades />
    </Layout>
  );
}
