// --- START OF FILE Register.tsx ---
// MODIFIED FOR FRONTEND-ONLY SIMULATION

import { FC, useState } from "react";
import { School, ArrowLeft, ArrowRight, User, Mail, Lock } from "lucide-react";
import { HomeFooter } from "../components/layout/HomeFooter";
import { useRouter } from "next/navigation";

// Registration Progress Component
interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
}

const RegistrationProgress: FC<RegistrationProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="py-4 px-6 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium dark:text-white">
          Step {currentStep} of {totalSteps}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(((currentStep - 1) / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export const Register: FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    emailAddress: "",
    phoneNumber: "",
    country: "",
    streetAddress: "",
    city: "",
    stateOrProvince: "",
    postalCode: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const totalSteps = 3;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- THIS IS THE SIMULATED HANDLE SUBMIT ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Simulate network delay
    setTimeout(() => {
      console.log("Simulating successful registration with data:", formData);
      setSuccessMessage("Simulation Successful! You can now log in.");
      setIsSubmitting(false);
      
      // Redirect to login page after showing success message
      setTimeout(() => router.push('/login'), 2000);

    }, 1500);
  };

  const handleNavigate = (route: string) => router.push(route === 'home' ? '/' : '/');

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center"><User className="mr-2 h-5 w-5"/>Personal Information</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please provide your personal details.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="input-style" />
              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="input-style" />
            </div>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="input-style" />
            <select name="gender" value={formData.gender} onChange={handleChange} required className="input-style">
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" required className="input-style" />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center"><Mail className="mr-2 h-5 w-5"/>Contact & Address</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">How can we reach you?</p>
            <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="Email Address (@emsi-etu.ma)" required pattern=".+@emsi-etu\.ma$" title="Email must be a valid @emsi-etu.ma address." className="input-style" />
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required className="input-style" />
            <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required className="input-style" />
            <input name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="Street Address" required className="input-style" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="input-style" />
              <input name="stateOrProvince" value={formData.stateOrProvince} onChange={handleChange} placeholder="State/Province" required className="input-style" />
              <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" required className="input-style" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center"><Lock className="mr-2 h-5 w-5"/>Account Credentials</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Create your secure login credentials.</p>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="input-style" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$" title="Password must be at least 8 characters and include uppercase, lowercase, number, and a special character." className="input-style" />
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="input-style" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <div className="flex-grow flex flex-col items-center pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center cursor-pointer" onClick={() => handleNavigate("home")}>
              <School className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-2xl font-bold dark:text-white">EMSI-School</span>
            </div>
            <h2 className="mt-8 text-3xl font-extrabold dark:text-white">Student Registration</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">Sign in</a>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <RegistrationProgress currentStep={step} totalSteps={totalSteps} />
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-8">
                {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{error}</div>}
                {successMessage && <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">{successMessage}</div>}
                {!successMessage && renderStep()}
              </div>

              {!successMessage && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 flex justify-between">
                  <button type="button" onClick={prevStep} disabled={step === 1} className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </button>
                  {step < totalSteps ? (
                    <button type="button" onClick={nextStep} className="btn-primary">
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50 disabled:cursor-wait">
                      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <HomeFooter />
      <style jsx>{`
        .input-style { display: block; width: 100%; padding: 0.5rem 0.75rem; font-size: 0.875rem; line-height: 1.25rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); outline: none; transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }
        .dark .input-style { background-color: #374151; border-color: #4B5563; color: #F9FAFB; }
        .input-style:focus { border-color: #3B82F6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); }
        .btn-primary { display: inline-flex; align-items: center; padding: 0.5rem 1rem; border: 1px solid transparent; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; color: white; background-color: #2563EB; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); cursor: pointer; }
        .btn-primary:hover { background-color: #1D4ED8; }
        .btn-secondary { display: inline-flex; align-items: center; padding: 0.5rem 1rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; color: #374151; background-color: white; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); cursor: pointer; }
        .dark .btn-secondary { background-color: #374151; color: #F9FAFB; border-color: #4B5563; }
        .btn-secondary:hover { background-color: #F9FAFB; }
        .dark .btn-secondary:hover { background-color: #4B5563; }
      `}</style>
    </div>
  );
};
// --- END OF FILE Register.tsx ---