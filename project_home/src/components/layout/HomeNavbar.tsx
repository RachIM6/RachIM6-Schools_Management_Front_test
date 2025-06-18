"use client";

import { FC, useState, useEffect } from "react";
import { School, Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HomeNavbarProps {
  onNavigate: (route: string) => void;
}

export const HomeNavbar: FC<HomeNavbarProps> = ({ onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Initialize dark mode from localStorage on component mount
  useEffect(() => {
    // Check if window is available (client side)
    if (typeof window !== "undefined") {
      const darkModePreference = localStorage.getItem("darkMode") === "true";
      setIsDarkMode(darkModePreference);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);

    // Save preference to localStorage
    localStorage.setItem("darkMode", newDarkModeState.toString());

    // Toggle dark mode class on html element
    if (newDarkModeState) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleHomeClick = () => {
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    // If already on home page, scroll to top
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home page
      router.push("/");
    }
  };

  const handleNavigate = (route: string) => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    if (route === "login") {
      router.push("/login");
    } else if (route === "register") {
      router.push("/register");
    } else if (route === "contact") {
      router.push("/contact");
    } else if (route === "about") {
      router.push("/about");
    } else if (route === "faq") {
      router.push("/faq");
    } else if (route === "courses") {
      router.push("/courses");
    }
  };

  return (
    <nav className="bg-transparent py-3 sticky top-0 z-50 w-3/4 mx-auto rounded-full px-4 my-4">
      <div className="flex justify-between items-center bg-[#E8F2EF]/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
        {/* Logo and School Name */}
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleHomeClick}
          >
            <School className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-lg font-bold text-gray-800">
              EMSI-School
            </span>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={handleHomeClick}
            className="text-gray-700 hover:text-blue-600 px-1 py-2 text-sm font-medium"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigate("about")}
            className="text-gray-700 hover:text-blue-600 px-1 py-2 text-sm font-medium"
          >
            About us
          </button>
          <button
            onClick={() => handleNavigate("contact")}
            className="text-gray-700 hover:text-blue-600 px-1 py-2 text-sm font-medium"
          >
            Contact us
          </button>
          <button
            onClick={() => handleNavigate("faq")}
            className="text-gray-700 hover:text-blue-600 px-1 py-2 text-sm font-medium"
          >
            FAQ's
          </button>
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          <button
            onClick={() => handleNavigate("login")}
            className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
          >
            Sign in
          </button>
          <button
            onClick={() => handleNavigate("register")}
            className="px-4 py-2 text-sm font-medium text-white bg-[#3B82F6] rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Register as a student
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white shadow-lg rounded-lg mx-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={handleHomeClick}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("about")}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              About us
            </button>
            <button
              onClick={() => handleNavigate("contact")}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Contact us
            </button>
            <button
              onClick={() => handleNavigate("faq")}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              FAQ's
            </button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              <div className="flex items-center px-3 py-2">
                <span className="text-sm font-medium text-gray-700">
                  Dark mode
                </span>
                <button
                  onClick={toggleDarkMode}
                  className="ml-auto p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  )}
                </button>
              </div>
              <button
                onClick={() => handleNavigate("login")}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Sign in
              </button>
              <button
                onClick={() => handleNavigate("register")}
                className="block w-full text-left px-3 py-2 text-base font-medium bg-[#3B82F6] text-white hover:bg-blue-600 rounded-md"
              >
                Register as a student
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
