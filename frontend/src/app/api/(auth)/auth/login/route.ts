import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { handleLogin } from "@/app/api/controller/userAuth";

import { LoginUser } from '@/lib/types/AuthInterface/authInterface';

import handler from "@/app/api/connectDB";

export async function POST(request: NextRequest) {
    try {
        await handler()
        const body: LoginUser = await request.json();

        const { user, accessToken, refreshToken } = await handleLogin(body);
        const cookieStore = await cookies();

        user.refreshToken = refreshToken
        await user.save()

        cookieStore.set("token", refreshToken, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });

        return NextResponse.json(
            { msg: `Welcome Again ${user.fullName}` },
            { status: 200 }
        );

    } catch (err) {
        return NextResponse.json(
            { msg: err.message || "Login failed" },
            { status: 401 }
        );
    }
}
