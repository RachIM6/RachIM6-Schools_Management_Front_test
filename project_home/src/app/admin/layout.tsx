"use client";

import { useState, useEffect } from "react";
import { AdminProvider } from "../../context/AdminContext";
import { ToastProvider } from "../../components/ui/Toast";
import { Sidebar } from "../../components/layout/Sidebar";
import { Header } from "../../components/layout/Header";
import { MobileMenu } from "../../components/layout/MobileMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <AdminProvider>
      <ToastProvider>
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
          {!isMobile && <Sidebar />}

          <div className="flex flex-col flex-1 overflow-hidden">
            <Header
              onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isMobile={isMobile}
            />

            {isMobile && (
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            )}

            <main className="flex-1 overflow-y-auto p-4 md:p-6 dark:bg-gray-900">
              <div className="mx-auto max-w-7xl">{children}</div>
            </main>
          </div>
        </div>
      </ToastProvider>
    </AdminProvider>
  );
}
