import { FC, useState } from "react";
import { School, ArrowLeft, ArrowRight } from "lucide-react";
import { HomeFooter } from "../components/layout/HomeFooter";
import { useRouter } from "next/navigation";
import { storeVerificationToken } from "../utils/emailVerification";

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
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

// Validation functions for each step
const validatePersonalInfo = (data: any) => {
  const errors: Record<string, string> = {};
  
  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }
  
  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }
  
  if (!data.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  } else {
    const birthDate = new Date(data.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 16) {
      errors.dateOfBirth = "You must be at least 16 years old to register";
    }
  }
  
  if (!data.gender) {
    errors.gender = "Gender is required";
  }
  
  if (!data.nationality.trim()) {
    errors.nationality = "Nationality is required";
  }
  
  return errors;
};

const validateContactInfo = (data: any) => {
  const errors: Record<string, string> = {};
  
  if (!data.emailAddress.trim()) {
    errors.emailAddress = "Email address is required";
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(data.emailAddress)) {
      errors.emailAddress = "Email must be a valid Gmail address (@gmail.com)";
    }
  }
  
  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else {
    const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }
  }
  
  if (!data.country.trim()) {
    errors.country = "Country is required";
  }
  
  if (!data.streetAddress.trim()) {
    errors.streetAddress = "Street address is required";
  }
  
  if (!data.city.trim()) {
    errors.city = "City is required";
  }
  
  if (!data.stateOrProvince.trim()) {
    errors.stateOrProvince = "State/Province is required";
  }
  
  if (!data.postalCode.trim()) {
    errors.postalCode = "Postal code is required";
  } else {
    const postalRegex = /^[A-Za-z0-9\s\-]{3,20}$/;
    if (!postalRegex.test(data.postalCode)) {
      errors.postalCode = "Please enter a valid postal code";
    }
  }
  
  return errors;
};

const validateAccountInfo = (data: any) => {
  const errors: Record<string, string> = {};
  
  if (!data.username.trim()) {
    errors.username = "Username is required";
  } else {
    const usernameRegex = /^[a-zA-Z0-9._-]{3,50}$/;
    if (!usernameRegex.test(data.username)) {
      errors.username = "Username must be 3-50 characters with only letters, numbers, dots, underscores, and hyphens";
    }
  }
  
  if (!data.password) {
    errors.password = "Password is required";
  } else {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,128}$/;
    if (!passwordRegex.test(data.password)) {
      errors.password = "Password must be 8-128 characters and include: uppercase letter, lowercase letter, number, and special character";
    }
  }
  
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  
  return errors;
};

const validateEducationalInfo = (data: any) => {
  const errors: Record<string, string> = {};
  
  if (!data.institutionName.trim()) {
    errors.institutionName = "Institution name is required";
  }
  
  if (!data.major) {
    errors.major = "Major/Field of study is required";
  }
  
  if (!data.educationLevel) {
    errors.educationLevel = "Education level is required";
  }
  
  if (!data.institutionAddress.trim()) {
    errors.institutionAddress = "Institution address is required";
  }
  
  return errors;
};

const validateEmergencyContact = (data: any) => {
  const errors: Record<string, string> = {};
  
  if (!data.emergencyContactName.trim()) {
    errors.emergencyContactName = "Emergency contact name is required";
  }
  
  if (!data.emergencyContactPhone.trim()) {
    errors.emergencyContactPhone = "Emergency contact phone number is required";
  } else {
    const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(data.emergencyContactPhone)) {
      errors.emergencyContactPhone = "Please enter a valid emergency contact phone number";
    }
  }
  
  if (!data.emergencyContactRelationship) {
    errors.emergencyContactRelationship = "Emergency contact relationship is required";
  }
  
  return errors;
};

export const Register: FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",

    // Contact Info
    emailAddress: "",
    phoneNumber: "",
    country: "",
    streetAddress: "",
    city: "",
    stateOrProvince: "",
    postalCode: "",

    // Account Info
    username: "",
    password: "",
    confirmPassword: "",

    // Educational Info
    institutionName: "",
    major: "",
    educationLevel: "",
    institutionAddress: "",
    additionalInformation: "",

    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
  });

  const totalSteps = 5;

  const validateCurrentStep = () => {
    let stepErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        stepErrors = validatePersonalInfo(formData);
        break;
      case 2:
        stepErrors = validateContactInfo(formData);
        break;
      case 3:
        stepErrors = validateAccountInfo(formData);
        break;
      case 4:
        stepErrors = validateEducationalInfo(formData);
        break;
      case 5:
        stepErrors = validateEmergencyContact(formData);
        break;
      default:
        stepErrors = {};
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
      setErrors({}); // Clear errors when moving to next step
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({}); // Clear errors when going back
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all steps before submission
    const allErrors: Record<string, string> = {};
    
    // Validate each step
    const personalErrors = validatePersonalInfo(formData);
    const contactErrors = validateContactInfo(formData);
    const accountErrors = validateAccountInfo(formData);
    const educationalErrors = validateEducationalInfo(formData);
    const emergencyErrors = validateEmergencyContact(formData);
    
    // Merge all errors
    Object.assign(allErrors, personalErrors, contactErrors, accountErrors, educationalErrors, emergencyErrors);
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // Scroll to the first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Send verification email
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.emailAddress,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send verification email');
      }

      const result = await response.json();

      if (result.success) {
        // Store verification token using utility function
        storeVerificationToken(formData.emailAddress, result.token);

        // Store user data for later use (after email verification)
        const userData = {
          ...formData,
          isEmailVerified: false,
          registrationDate: new Date().toISOString(),
        };
        localStorage.setItem('pending_registration', JSON.stringify(userData));

        // Simulate API call with random delay between 1-2 seconds
        const delay = Math.random() * 1000 + 1000; // Random delay between 1000-2000ms
        await new Promise(resolve => setTimeout(resolve, delay));

        // Show success message
        setIsSuccess(true);
      } else {
        throw new Error(result.error || 'Failed to send verification email');
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigate = (route: string) => {
    switch (route) {
      case "home":
        router.push("/");
        break;
      default:
        router.push("/");
    }
  };

  const renderPersonalInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Personal Information
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Please provide your personal details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
              errors.firstName ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
              errors.lastName ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="dateOfBirth"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          max={(() => {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 16);
            return date.toISOString().split("T")[0];
          })()}
          required
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.dateOfBirth ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dateOfBirth}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          You must be at least 16 years old to register.
        </p>
      </div>

      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.gender ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        >
          <option value="">Select gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gender}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="nationality"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Nationality
        </label>
        <input
          type="text"
          id="nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.nationality ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.nationality && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nationality}</p>
        )}
      </div>
    </div>
  );

  const renderContactInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Contact Information
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        How can we reach you?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="emailAddress"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email Address
          </label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
            required
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
              errors.emailAddress ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            }`}
          />
          {errors.emailAddress && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.emailAddress}</p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Must be a valid Gmail address (@gmail.com)
          </p>
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="^[+]?[0-9\s\-()]{7,20}$"
            placeholder="+1234567890 or (123) 456-7890"
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
              errors.phoneNumber ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            }`}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.country ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.country && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="streetAddress"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Street Address
        </label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.streetAddress ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.streetAddress && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.streetAddress}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
              errors.city ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            }`}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="stateOrProvince"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            State/Province
          </label>
          <input
            type="text"
            id="stateOrProvince"
            name="stateOrProvince"
            value={formData.stateOrProvince}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
              errors.stateOrProvince ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            }`}
          />
          {errors.stateOrProvince && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.stateOrProvince}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            pattern="^[A-Za-z0-9\s\-]{3,20}$"
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
              errors.postalCode ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            }`}
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.postalCode}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAccountInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Account Information
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Create your login credentials
      </p>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          pattern="^[a-zA-Z0-9._-]{3,50}$"
          required
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.username ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          3-50 characters. Only letters, numbers, dots, underscores, and hyphens
          allowed.
        </p>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,128}$"
          required
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.password ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Password must be 8-128 characters and include: uppercase letter,
          lowercase letter, number, and special character.
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.confirmPassword ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );

  const renderEducationalInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Educational Information
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Tell us about your educational background
      </p>

      <div>
        <label
          htmlFor="institutionName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Current/Previous Institution Name
        </label>
        <input
          type="text"
          id="institutionName"
          name="institutionName"
          value={formData.institutionName}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.institutionName ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.institutionName && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.institutionName}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="major"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Major/Field of Study
          </label>
          <select
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
              errors.major ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            }`}
          >
            <option value="">Select major</option>
            <option value="COMPUTER_SCIENCE">Computer Science</option>
            <option value="ENGINEERING">Engineering</option>
            <option value="BUSINESS">Business</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.major && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.major}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="educationLevel"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Education Level
          </label>
          <select
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
              errors.educationLevel ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            }`}
          >
            <option value="">Select level</option>
            <option value="BACHELOR">Bachelor</option>
            <option value="MASTER">Master</option>
            <option value="PHD">PhD</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.educationLevel && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.educationLevel}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="institutionAddress"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Institution Address
        </label>
        <input
          type="text"
          id="institutionAddress"
          name="institutionAddress"
          value={formData.institutionAddress}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.institutionAddress ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.institutionAddress && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.institutionAddress}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="additionalInformation"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Additional Information
        </label>
        <textarea
          id="additionalInformation"
          name="additionalInformation"
          value={formData.additionalInformation}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  );

  const renderEmergencyContactStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Emergency Contact
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Who should we contact in case of emergency?
      </p>

      <div>
        <label
          htmlFor="emergencyContactName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <input
          type="text"
          id="emergencyContactName"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.emergencyContactName ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.emergencyContactName && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.emergencyContactName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="emergencyContactPhone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="emergencyContactPhone"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
          pattern="^[+]?[0-9\s\-()]{7,20}$"
          placeholder="+1234567890 or (123) 456-7890"
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.emergencyContactPhone ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.emergencyContactPhone && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.emergencyContactPhone}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="emergencyContactRelationship"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Relationship
        </label>
        <select
          id="emergencyContactRelationship"
          name="emergencyContactRelationship"
          value={formData.emergencyContactRelationship}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white ${
            errors.emergencyContactRelationship ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          }`}
        >
          <option value="">Select relationship</option>
          <option value="Parent">Parent</option>
          <option value="Guardian">Guardian</option>
          <option value="Spouse">Spouse</option>
          <option value="Sibling">Sibling</option>
          <option value="Friend">Friend</option>
          <option value="Other">Other</option>
        </select>
        {errors.emergencyContactRelationship && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.emergencyContactRelationship}</p>
        )}
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <div className="flex-grow flex flex-col items-center pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center cursor-pointer"
              onClick={() => handleNavigate("home")}
            >
              <School className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-2xl font-bold dark:text-white">
                EMSI-School
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-12 text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <svg
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Title */}
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Registration Successful!
              </h3>

              {/* Success Message */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Thank you for registering with EMSI-School. Please check your email to verify your account before signing in.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = "/login"}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Login
                </button>
                <button
                  onClick={() => handleNavigate("home")}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );

  return isSuccess ? renderSuccessMessage() : (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <div className="flex-grow flex flex-col items-center pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center cursor-pointer"
              onClick={() => handleNavigate("home")}
            >
              <School className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-2xl font-bold dark:text-white">
                EMSI-School
              </span>
            </div>
            <h2 className="mt-8 text-3xl font-extrabold dark:text-white">
              Student Registration
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign in
              </a>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <RegistrationProgress currentStep={step} totalSteps={totalSteps} />

            <form onSubmit={handleSubmit}>
              <div className="px-6 py-8">
                {step === 1 && renderPersonalInfoStep()}
                {step === 2 && renderContactInfoStep()}
                {step === 3 && renderAccountInfoStep()}
                {step === 4 && renderEducationalInfoStep()}
                {step === 5 && renderEmergencyContactStep()}
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </button>
                )}
                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      step === 1 ? "ml-auto" : ""
                    }`}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            <p>
              By registering, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};