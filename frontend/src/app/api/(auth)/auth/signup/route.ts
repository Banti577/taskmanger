import { NextRequest, NextResponse } from 'next/server';

import { handleSignup } from '@/app/api/controller/userAuth';

import { SignupUser } from '@/lib/types/AuthInterface/authInterface';
import handler from "@/app/api/connectDB";

export async function POST(request: NextRequest) {
  try {
      await handler()
    const data: SignupUser = await request.json();
    await handleSignup(data);

    return NextResponse.json(
      { msg: "Signup successful" },
      { status: 201 }
    );

  } catch (err) {
    return NextResponse.json(
      { msg: err.message },
      { status: 400 }
    );
  }
}