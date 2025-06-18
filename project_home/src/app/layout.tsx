"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Check for dark mode preference in localStorage
    const darkModePreference = localStorage.getItem("darkMode") === "true";

    // Apply dark mode class based on stored preference
    if (darkModePreference) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <html lang="en" className="h-full">
      <head>
        <title>EMSI-School - School Management System</title>
        <meta
          name="description"
          content="A comprehensive school management system for educational institutions"
        />
      </head>
      <body className={`${inter.className} h-full bg-white dark:bg-gray-900`}>
        {children}
      </body>
    </html>
  );
}
