import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

import { verifyJwtToken } from "../middleware/checkAuth";

export async function GET(request: NextRequest) {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { msg: "Unauthorized - No token" },
                { status: 401 }
            );
        }

        const user = await verifyJwtToken();

        return NextResponse.json(
            { msg: "Protected data", user },
            { status: 200 }
        );

    } catch (err) {
        return NextResponse.json(
            { msg: "Invalid or expired token" },
            { status: 401 }
        );
    }
} 
