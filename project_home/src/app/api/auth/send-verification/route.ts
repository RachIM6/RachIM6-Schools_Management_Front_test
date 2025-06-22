import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import CryptoJS from 'crypto-js';

// Create transporter for Mailpit
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
  auth: {
    user: '',
    pass: ''
  }
});

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json();

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Email, firstName, and lastName are required' },
        { status: 400 }
      );
    }

    // Generate verification token
    const token = CryptoJS.lib.WordArray.random(32).toString();
    const verificationUrl = `${request.nextUrl.origin}/verify-email?token=${token}`;

    // Store verification token in localStorage (we'll handle this on the client side)
    // For now, we'll return the token to be stored by the client

    // Email content
    const mailOptions = {
      from: '"EMSI-School" <noreply@emsi-school.com>',
      to: email,
      subject: 'Verify Your Email Address - EMSI-School',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1f2937; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">EMSI-School</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9fafb;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome to EMSI-School!</h2>
            
            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
              Hello ${firstName} ${lastName},
            </p>
            
            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
              Thank you for registering with EMSI-School. To complete your registration and activate your account, 
              please click the button below to verify your email address.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; 
                        border-radius: 6px; display: inline-block; font-weight: 500;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="color: #3b82f6; font-size: 14px; word-break: break-all; margin-bottom: 20px;">
              ${verificationUrl}
            </p>
            
            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
              This verification link will expire in 24 hours. If you didn't create an account with EMSI-School, 
              you can safely ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 12px; text-align: center;">
              © 2024 EMSI-School. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully',
      token: token // Return token to be stored by client
    });

  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
} 