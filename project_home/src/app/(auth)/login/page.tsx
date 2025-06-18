// --- START OF FILE: app/login/page.tsx ---
"use client";

import { Login } from "../../../pages/Login";

// The login page itself is public and does not need any context providers.
// The providers live in the layouts for the protected routes.
export default function LoginPage() {
  return <Login />;
}
// --- END OF FILE: app/login/page.tsx ---