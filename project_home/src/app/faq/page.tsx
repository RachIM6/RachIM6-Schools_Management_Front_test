"use client";

import { FC, useState } from "react";
import { HomeNavbar } from "../../components/layout/HomeNavbar";
import { HomeFooter } from "../../components/layout/HomeFooter";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  toggleOpen,
}) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 px-2">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage: FC = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number>(0);

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

  // Sample FAQ data
  const faqs = [
    {
      question: "What features does the school management system offer?",
      answer:
        "Our school management system offers comprehensive features including student management, staff management, department organization, academic planning, scheduling, grade tracking, attendance monitoring, and communication tools for all stakeholders.",
    },
    {
      question: "How secure is the student data in your system?",
      answer:
        "We prioritize data security with industry-standard encryption, regular security audits, role-based access control, and compliance with educational data privacy regulations. All sensitive information is protected with multiple layers of security.",
    },
    {
      question:
        "Can parents access the system to track their child's progress?",
      answer:
        "Yes, parents receive dedicated login credentials to access a parent portal where they can view their child's attendance, grades, assignments, teacher feedback, and school announcements. They can also communicate with teachers through the platform.",
    },
    {
      question: "Is the system accessible on mobile devices?",
      answer:
        "Yes, our system is fully responsive and can be accessed on any device including smartphones and tablets. We also offer dedicated mobile apps for iOS and Android for a more optimized mobile experience.",
    },
    {
      question: "How do you handle system updates and maintenance?",
      answer:
        "We perform regular updates and maintenance during off-peak hours to minimize disruption. Users are notified in advance of any scheduled maintenance. The system is continuously improved based on user feedback and educational best practices.",
    },
    {
      question: "What kind of support do you provide for users?",
      answer:
        "We offer comprehensive support including 24/7 technical assistance, detailed documentation, video tutorials, and regular training sessions. Our support team is available via email, phone, and live chat to address any questions or issues.",
    },
    {
      question: "Can the system be customized for our specific school needs?",
      answer:
        "Yes, our system is highly customizable. Schools can configure various modules, create custom fields, design their own reports, and adapt the workflow to match their specific administrative processes and educational requirements.",
    },
    {
      question: "How does the system handle academic scheduling?",
      answer:
        "The scheduling module allows administrators to create and manage class schedules, assign teachers and classrooms, handle conflicts, and make adjustments when needed. The system also supports automated scheduling based on predefined rules and constraints.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#E8F2EF]">
      <HomeNavbar onNavigate={handleNavigate} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-3xl mx-auto">
            <div className="p-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-2">
                  FREQUENTLY ASKED QUESTIONS
                </h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Find answers to common questions about our school management
                  system. If you don't see what you're looking for, please
                  contact our support team.
                </p>
              </div>

              {/* FAQ List */}
              <div className="mt-8">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={index === openIndex}
                    toggleOpen={() =>
                      setOpenIndex(index === openIndex ? -1 : index)
                    }
                  />
                ))}
              </div>

              {/* Contact CTA */}
              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-4">
                  Still have questions? We're here to help!
                </p>
                <button
                  onClick={() => handleNavigate("contact")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
};

export default FAQPage;
