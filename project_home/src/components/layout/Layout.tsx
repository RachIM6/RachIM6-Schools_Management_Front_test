// --- START OF FILE: components/layout/Layout.tsx (FINAL) ---
import { FC, ReactNode, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileMenu } from "./MobileMenu";
import { Route } from "@/types";

interface LayoutProps {
  children: ReactNode;
  userRole: "admin" | "student";
}

export const Layout: FC<LayoutProps> = ({ children, userRole }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {!isMobile && <Sidebar userRole={userRole} />}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMobile={isMobile} userRole={userRole} onRouteChange={function (route: Route): void {
          throw new Error("Function not implemented.");
        } } />
        {isMobile && <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} userRole={userRole} currentRoute={"dashboard"} onRouteChange={function (route: Route): void {
          throw new Error("Function not implemented.");
        } } />}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};
// --- END OF FILE: components/layout/Layout.tsx (FINAL) ---