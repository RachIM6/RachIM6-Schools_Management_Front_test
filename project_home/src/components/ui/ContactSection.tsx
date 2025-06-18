import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to our team and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Leave us a message
            </h3>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  placeholder="First_Name Last_Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>

              <div>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Address
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <p className="text-gray-600 dark:text-gray-300">
                  +91 9599272754
                </p>
              </div>

              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <p className="text-gray-600 dark:text-gray-300">
                  hello@info.com.ng
                </p>
              </div>

              <div className="flex space-x-4">
                <Link
                  href="https://youtube.com"
                  aria-label="YouTube"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Youtube className="h-5 w-5" />
                </Link>

                <Link
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Instagram className="h-5 w-5" />
                </Link>

                <Link
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Facebook className="h-5 w-5" />
                </Link>

                <Link
                  href="https://twitter.com"
                  aria-label="Twitter"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Map */}
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden shadow-sm">
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

        {/* Button to dedicated Contact page */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Visit Full Contact Page
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
