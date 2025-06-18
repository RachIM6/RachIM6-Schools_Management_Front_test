"use client";

import { Attendance } from "../../pages/Attendance";
import { Layout } from "../../components/layout/Layout";

export default function AttendancePage() {
  return (
    <Layout currentRoute="attendance" onRouteChange={() => {}}>
      <Attendance />
    </Layout>
  );
}
