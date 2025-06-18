import { FC } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  ClipboardList,
} from "lucide-react";
import { HomeNavbar } from "../components/layout/HomeNavbar";
import { HomeFooter } from "../components/layout/HomeFooter";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  learnMoreLink?: string;
}

const FeatureCard: FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  learnMoreLink,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="mb-4 text-blue-600 dark:text-blue-400">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{description}</p>
      {learnMoreLink && (
        <Link
          href={learnMoreLink}
          className="text-blue-600 dark:text-blue-400 inline-flex items-center text-sm font-medium"
        >
          Learn More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  );
};

// Hero Section Component
const HeroSection: FC<{ onNavigate: (route: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <section className="relative py-20 overflow-hidden bg-[#F2F7FB] dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[80%] top-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute left-[10%] top-[60%] w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium text-[#3B82F6] bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30 rounded-full">
                Higher Education Management
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 dark:text-white">
              <span className="block">Comprehensive</span>
              <span className="block text-[#3B82F6] dark:text-blue-400">
                School Management System
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              A unified administrative platform designed specifically for higher
              education institutions and school groups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                onClick={() => onNavigate("login")}
              >
                Access Your Dashboard
              </button>
              <button
                className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                onClick={() => onNavigate("register")}
              >
                Register as a student <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-full">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-700">
                <Image
                  src="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Modern higher education campus with students"
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium dark:text-white">
                    System Usage
                  </span>
                  <span className="text-xs text-green-500 font-medium">
                    +24%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Management Module Card Component
interface ModuleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: string;
  color: string;
}

const ModuleCard: FC<ModuleCardProps> = ({
  icon,
  title,
  description,
  stats,
  color,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className={`h-2 ${color}`}></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
            {icon}
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {stats}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {description}
        </p>
        <Link
          href="#"
          className="text-blue-600 dark:text-blue-400 inline-flex items-center text-sm font-medium"
        >
          Manage
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export const Home: FC = () => {
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
    <div className="flex min-h-screen flex-col bg-[#F2F7FB] dark:bg-gray-900">
      <HomeNavbar onNavigate={handleNavigate} />
      <main className="flex-grow">
        <HeroSection onNavigate={handleNavigate} />

        {/* Features Section - About Us */}
        <section id="about" className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 rounded-full mb-4">
                About Our System
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">
                Comprehensive School Management
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Our system streamlines administrative tasks and enhances
                communication between students, teachers, departments, and
                administration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <FeatureCard
                icon={
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg inline-block">
                    <Users className="h-6 w-6" />
                  </div>
                }
                title="User Management"
                description="Manage students, teachers, department members, and administrative staff in one place."
                learnMoreLink="#"
              />
              <FeatureCard
                icon={
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg inline-block">
                    <Building2 className="h-6 w-6" />
                  </div>
                }
                title="Department Management"
                description="Organize departments, modules, filières, and diplomas efficiently."
                learnMoreLink="#"
              />
              <FeatureCard
                icon={
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg inline-block">
                    <Calendar className="h-6 w-6" />
                  </div>
                }
                title="Academic Planning"
                description="Handle schedules, grades, attendance tracking, and academic requests."
                learnMoreLink="#"
              />
            </div>

            {/* Pagination dots - a modern UI element from the inspiration */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Management Modules Section */}
        <section id="modules" className="py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <span className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                  Management Modules
                </span>
                <h2 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">
                  Complete Administration Suite
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Our comprehensive modules cover every aspect of school
                  management and administration.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ModuleCard
                icon={
                  <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                }
                title="Student Management"
                description="Complete student records, profiles, academic history, and performance tracking."
                stats="2,500+ Students"
                color="bg-blue-500"
              />
              <ModuleCard
                icon={
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                }
                title="Staff Management"
                description="Teacher profiles, department assignments, and administrative staff records."
                stats="350+ Staff Members"
                color="bg-purple-500"
              />
              <ModuleCard
                icon={
                  <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                }
                title="Department Management"
                description="Organize school departments, assign heads, and manage resources efficiently."
                stats="12 Departments"
                color="bg-green-500"
              />
              <ModuleCard
                icon={
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                }
                title="Academic Management"
                description="Modules, filières, diplomas, and curriculum planning all in one place."
                stats="45+ Programs"
                color="bg-yellow-500"
              />
              <ModuleCard
                icon={
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                }
                title="Schedule Management"
                description="Class schedules, room assignments, and academic calendar planning."
                stats="200+ Classes"
                color="bg-red-500"
              />
              <ModuleCard
                icon={
                  <ClipboardList className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                }
                title="Grades & Attendance"
                description="Track student attendance and manage grade records and transcripts."
                stats="15,000+ Records"
                color="bg-indigo-500"
              />
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>

            <div className="text-center mt-10">
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                View All Modules
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Streamline Your Higher Education Management
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Our unified platform connects all stakeholders - students,
              teachers, department members, administrators, and school directors
              - providing a seamless management experience for your entire
              institution network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => handleNavigate("login")}
              >
                Access Your Dashboard
              </button>
              <button
                className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                onClick={() => handleNavigate("register")}
              >
                Register as a student <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
};
