# Email Verification System Setup

This document explains how to set up and use the email verification system for student registration.

## Overview

The email verification system allows students to register and receive a verification email. Once they click the verification link, their email is marked as verified and they can sign in to their account.

## Prerequisites

1. **Mailpit** - A mail testing tool that captures emails locally
2. **Node.js** and **npm** - For running the Next.js application

## Setup Instructions

### 1. Install Mailpit

#### On Windows (using Chocolatey):
```bash
choco install mailpit
```

#### On macOS (using Homebrew):
```bash
brew install mailpit
```

#### On Linux:
```bash
# Download the latest release from https://github.com/axllent/mailpit/releases
# Or use the installation script:
curl -L https://raw.githubusercontent.com/axllent/mailpit/main/install.sh | bash
```

### 2. Start Mailpit

Run Mailpit in the background:
```bash
mailpit
```

This will start Mailpit on:
- **SMTP Server**: localhost:1025 (for sending emails)
- **Web Interface**: http://localhost:8025 (for viewing emails)

### 3. Install Dependencies

The required dependencies are already installed:
- `nodemailer` - For sending emails
- `crypto-js` - For generating secure tokens

### 4. Start the Application

```bash
npm run dev
```

## How It Works

### Registration Flow

1. **Student Registration**: When a student completes registration, the system:
   - Generates a secure verification token
   - Sends a verification email via Mailpit
   - Stores the token in localStorage
   - Stores registration data as "pending"

2. **Email Verification**: When the student clicks the verification link:
   - The system validates the token
   - Marks the email as verified
   - Removes the used token
   - Allows the student to sign in

3. **Login**: When a student tries to sign in:
   - The system checks if their email is verified
   - If verified, completes registration and allows login
   - If not verified, shows an error message

### File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── send-verification/route.ts    # Sends verification emails
│   │       └── verify-email/route.ts         # Verifies email tokens
│   └── verify-email/
│       └── page.tsx                          # Email verification page
├── pages/
│   ├── Register.tsx                          # Updated registration form
│   └── Login.tsx                             # Updated login with verification check
```

## Testing the System

### 1. Register a New Student

1. Go to `/register`
2. Fill out the registration form
3. Submit the form
4. You should see a success message asking to check email

### 2. Check the Email

1. Open http://localhost:8025 in your browser
2. You should see the verification email
3. Click the "Verify Email Address" button or copy the verification link

### 3. Verify Email

1. The verification link will take you to `/verify-email`
2. The system will validate the token and mark the email as verified
3. You'll see a success message

### 4. Sign In

1. Go to `/login`
2. Use the email address you registered with
3. Enter any password (for demo purposes)
4. You should be able to sign in successfully

## Storage

The system uses localStorage to store:
- `verification_tokens` - Maps email addresses to verification tokens
- `verified_emails` - Array of verified email addresses
- `pending_registration` - Registration data waiting for email verification

## Security Notes

- This is a demo implementation using localStorage
- In production, you would:
  - Use a real database to store tokens and user data
  - Implement proper token expiration
  - Use HTTPS for all communications
  - Add rate limiting for email sending
  - Use environment variables for sensitive configuration

## Troubleshooting

### Email Not Received

1. Make sure Mailpit is running on port 1025
2. Check the Mailpit web interface at http://localhost:8025
3. Verify the email configuration in `/api/auth/send-verification/route.ts`

### Verification Link Not Working

1. Check the browser console for errors
2. Verify that the token is properly stored in localStorage
3. Make sure the verification page is accessible

### Login Issues

1. Check if the email is in the `verified_emails` array in localStorage
2. Verify that the registration data is properly stored
3. Check the browser console for error messages

## Customization

### Email Template

You can customize the email template in `/api/auth/send-verification/route.ts`. The current template includes:
- School branding
- Personalized greeting
- Verification button
- Manual link fallback
- Expiration notice

### Token Expiration

Currently, tokens don't expire. To add expiration:
1. Store timestamps with tokens
2. Check expiration during verification
3. Clean up expired tokens periodically

### Email Service

To use a real email service instead of Mailpit:
1. Update the nodemailer configuration
2. Add proper authentication
3. Use environment variables for credentials 