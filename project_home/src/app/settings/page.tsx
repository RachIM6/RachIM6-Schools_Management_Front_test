"use client";

import { Settings } from "../../pages/Settings";
import { Layout } from "../../components/layout/Layout";

export default function SettingsPage() {
  return (
    <Layout currentRoute="settings" onRouteChange={() => {}}>
      <Settings />
    </Layout>
  );
}
