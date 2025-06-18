"use client";

import { Staff } from "../../pages/Staff";
import { Layout } from "../../components/layout/Layout";

export default function StaffPage() {
  return (
    <Layout currentRoute="staff" onRouteChange={() => {}}>
      <Staff />
    </Layout>
  );
}
