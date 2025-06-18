"use client";

import { FC } from "react";
import { HomeNavbar } from "../../components/layout/HomeNavbar";
import { HomeFooter } from "../../components/layout/HomeFooter";
import { useRouter } from "next/navigation";
import { Youtube, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

const ContactPage: FC = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    switch (route) {
      case "home":
        router.push("/");
        break;
      case "login":
        router.push("/login");
        break;
      case "register":
        router.push("/register");
        break;
      case "contact":
        router.push("/contact");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#E8F2EF]">
      <HomeNavbar onNavigate={handleNavigate} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-5xl mx-auto">
            <div className="p-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-2">
                  CONTACT US
                </h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Contact Form */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-semibold mb-4">
                    Leave us a message
                  </h3>

                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        id="name"
                        placeholder="First_Name Last_Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <textarea
                        id="message"
                        placeholder="Your Message"
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none"
                    >
                      Send
                    </button>
                  </form>
                </div>

                {/* Contact Information */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-semibold mb-4">Address</h3>

                  <div className="space-y-4 mb-6">
                    <p className="text-gray-600">+91 9599272754</p>
                    <p className="text-gray-600">hello@info.com.ng</p>

                    <div className="flex space-x-4">
                      <Link
                        href="https://youtube.com"
                        aria-label="YouTube"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Youtube className="h-5 w-5" />
                      </Link>

                      <Link
                        href="https://instagram.com"
                        aria-label="Instagram"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>

                      <Link
                        href="https://facebook.com"
                        aria-label="Facebook"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Facebook className="h-5 w-5" />
                      </Link>

                      <Link
                        href="https://twitter.com"
                        aria-label="Twitter"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="h-64 bg-gray-200 rounded-md overflow-hidden shadow-sm">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.9360362927226!2d-122.41941482392136!3d37.77492597131238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858087e9656f7f%3A0xf5f6a7a6a1b7e5a5!2sHayes%20Valley%2C%20San%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1653698965425!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-md"
                      title="School Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
};

export default ContactPage;
