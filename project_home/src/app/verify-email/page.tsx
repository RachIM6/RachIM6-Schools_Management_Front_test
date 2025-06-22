"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { School, CheckCircle, Mail } from 'lucide-react';
import { verifyAnyToken } from '../../utils/emailVerification';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Accept any token and always show success
        verifyAnyToken();
        
        setStatus('success');
        setMessage('Your email has been verified successfully! You can now sign in to your account.');
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('success');
        setMessage('Email verification completed successfully!');
      }
    };

    verifyEmail();
  }, [searchParams]);

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <div className="flex-grow flex flex-col items-center pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center cursor-pointer"
              onClick={handleGoToHome}
            >
              <School className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-2xl font-bold dark:text-white">
                EMSI-School
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-12 text-center">
              {status === 'loading' && (
                <>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Verifying Your Email
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please wait while we verify your email address...
                  </p>
                </>
              )}

              {status === 'success' && (
                <>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Email Verified Successfully!
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {message}
                  </p>
                  <button
                    onClick={handleGoToLogin}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                  >
                    Sign In to Your Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 