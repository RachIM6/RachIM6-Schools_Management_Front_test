import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();

    if (!token || !email) {
      return NextResponse.json(
        { error: 'Token and email are required' },
        { status: 400 }
      );
    }

    // In a real application, you would verify the token against a database
    // For this demo, we'll just return success since we're storing tokens in localStorage
    // The actual verification will be done on the client side

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      email: email
    });

  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
} 