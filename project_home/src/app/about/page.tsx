"use client";

import { FC } from "react";
import { HomeNavbar } from "../../components/layout/HomeNavbar";
import { HomeFooter } from "../../components/layout/HomeFooter";
import { useRouter } from "next/navigation";
import { GraduationCap, Users, Building2, Calendar } from "lucide-react";
import Image from "next/image";

const AboutPage: FC = () => {
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
                  ABOUT US
                </h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
              </div>

              <div className="flex flex-col gap-8">
                {/* About School */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Our School Management System
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                      <p className="text-gray-600 mb-4">
                        EMSI-School is a comprehensive school management system
                        designed to streamline administrative tasks and enhance
                        communication between students, teachers, departments,
                        and administration.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Our platform provides a complete suite of tools for
                        managing all aspects of educational institutions, from
                        student records and staff management to academic
                        planning and departmental organization.
                      </p>
                      <p className="text-gray-600">
                        With our intuitive interface and powerful features,
                        schools can improve efficiency, reduce paperwork, and
                        focus more on what matters most: providing quality
                        education.
                      </p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="rounded-lg overflow-hidden shadow-md">
                        <Image
                          src="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Modern higher education campus"
                          className="w-full h-auto"
                          width={600}
                          height={400}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <div className="bg-[#E8F2EF] p-3 rounded-lg mr-4">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Student Management
                        </h3>
                        <p className="text-gray-600">
                          Complete student records, profiles, academic history,
                          and performance tracking.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-[#E8F2EF] p-3 rounded-lg mr-4">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Staff Management
                        </h3>
                        <p className="text-gray-600">
                          Teacher profiles, department assignments, and
                          administrative staff records.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-[#E8F2EF] p-3 rounded-lg mr-4">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Department Management
                        </h3>
                        <p className="text-gray-600">
                          Organize school departments, assign heads, and manage
                          resources efficiently.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-[#E8F2EF] p-3 rounded-lg mr-4">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Academic Planning
                        </h3>
                        <p className="text-gray-600">
                          Handle schedules, grades, attendance tracking, and
                          academic requests.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Our Mission */}
                <div className="mt-8 bg-[#E8F2EF] p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-gray-700">
                    Our mission is to empower educational institutions with
                    technology that simplifies administration, enhances
                    communication, and improves the educational experience for
                    all stakeholders. We believe that by reducing administrative
                    burden, schools can focus more on their primary mission:
                    providing quality education and fostering student growth.
                  </p>
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

export default AboutPage;
