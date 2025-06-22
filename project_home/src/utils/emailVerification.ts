/**
 * Email verification utility functions
 */

export interface VerificationToken {
  token: string;
  email: string;
  createdAt: number;
}

/**
 * Check if an email is verified
 */
export const isEmailVerified = (email: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const verifiedEmails = JSON.parse(localStorage.getItem('verified_emails') || '[]');
    return verifiedEmails.includes(email);
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
};

/**
 * Mark an email as verified
 */
export const markEmailAsVerified = (email: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const verifiedEmails = JSON.parse(localStorage.getItem('verified_emails') || '[]');
    if (!verifiedEmails.includes(email)) {
      verifiedEmails.push(email);
      localStorage.setItem('verified_emails', JSON.stringify(verifiedEmails));
    }
  } catch (error) {
    console.error('Error marking email as verified:', error);
  }
};

/**
 * Store a verification token
 */
export const storeVerificationToken = (email: string, token: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const storedTokens = JSON.parse(localStorage.getItem('verification_tokens') || '{}');
    storedTokens[email] = token;
    localStorage.setItem('verification_tokens', JSON.stringify(storedTokens));
  } catch (error) {
    console.error('Error storing verification token:', error);
  }
};

/**
 * Get a verification token for an email
 */
export const getVerificationToken = (email: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedTokens = JSON.parse(localStorage.getItem('verification_tokens') || '{}');
    return storedTokens[email] || null;
  } catch (error) {
    console.error('Error getting verification token:', error);
    return null;
  }
};

/**
 * Remove a verification token
 */
export const removeVerificationToken = (email: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const storedTokens = JSON.parse(localStorage.getItem('verification_tokens') || '{}');
    delete storedTokens[email];
    localStorage.setItem('verification_tokens', JSON.stringify(storedTokens));
  } catch (error) {
    console.error('Error removing verification token:', error);
  }
};

/**
 * Verify a token for an email
 */
export const verifyToken = (email: string, token: string): boolean => {
  const storedToken = getVerificationToken(email);
  if (storedToken === token) {
    markEmailAsVerified(email);
    removeVerificationToken(email);
    return true;
  }
  return false;
};

/**
 * Check if there's a pending registration for an email
 */
export const hasPendingRegistration = (email: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const pendingRegistration = localStorage.getItem('pending_registration');
    if (pendingRegistration) {
      const registrationData = JSON.parse(pendingRegistration);
      return registrationData.emailAddress === email && !registrationData.isEmailVerified;
    }
    return false;
  } catch (error) {
    console.error('Error checking pending registration:', error);
    return false;
  }
};

/**
 * Get pending registration data
 */
export const getPendingRegistration = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const pendingRegistration = localStorage.getItem('pending_registration');
    return pendingRegistration ? JSON.parse(pendingRegistration) : null;
  } catch (error) {
    console.error('Error getting pending registration:', error);
    return null;
  }
};

/**
 * Clear pending registration
 */
export const clearPendingRegistration = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('pending_registration');
  } catch (error) {
    console.error('Error clearing pending registration:', error);
  }
};

/**
 * Verify any token (accepts all tokens)
 */
export const verifyAnyToken = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    // Mark a default email as verified (for demo purposes)
    const verifiedEmails = JSON.parse(localStorage.getItem('verified_emails') || '[]');
    const defaultEmail = 'demo@example.com';
    if (!verifiedEmails.includes(defaultEmail)) {
      verifiedEmails.push(defaultEmail);
      localStorage.setItem('verified_emails', JSON.stringify(verifiedEmails));
    }

    // Complete any pending registration
    const pendingRegistration = localStorage.getItem('pending_registration');
    if (pendingRegistration) {
      const registrationData = JSON.parse(pendingRegistration);
      registrationData.isEmailVerified = true;
      localStorage.setItem('pending_registration', JSON.stringify(registrationData));
    }

    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

/**
 * Check if any email is verified (for demo purposes)
 */
export const isAnyEmailVerified = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const verifiedEmails = JSON.parse(localStorage.getItem('verified_emails') || '[]');
    return verifiedEmails.length > 0;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
}; 