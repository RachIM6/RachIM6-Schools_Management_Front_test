"use client";

import { FC } from "react";
import {
  School,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Github,
  Dribbble,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const HomeFooter: FC = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (window.location.pathname !== "/") {
      // Navigate to home page first, then scroll to section after a small delay
      router.push("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else {
      // Already on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        // If section not found, try again after a short delay
        // This helps when components are still rendering
        setTimeout(() => {
          const retrySection = document.getElementById(sectionId);
          if (retrySection) {
            retrySection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  const handleHomeClick = () => {
    // If already on home page, scroll to top
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home page
      router.push("/");
    }
  };

  const handleContactClick = () => {
    scrollToSection("contact");
  };

  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand and description */}
          <div>
            <div
              className="flex items-center cursor-pointer mb-4"
              onClick={handleHomeClick}
            >
              <School className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">EMSI-School</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Top learning experiences that create more talent in the world.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github size={18} />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  About us
                </button>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <button
                  onClick={handleContactClick}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} EMSI-School. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Twitter size={18} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Linkedin size={18} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Facebook size={18} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Github size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
