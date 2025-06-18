"use client";

import { Communication } from "../../pages/Communication";
import { Layout } from "../../components/layout/Layout";

export default function CommunicationPage() {
  return (
    <Layout currentRoute="communication" onRouteChange={() => {}}>
      <Communication />
    </Layout>
  );
}
