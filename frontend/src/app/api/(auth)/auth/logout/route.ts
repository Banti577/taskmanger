import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {

    const cookieStore = await cookies();
    try {
        console.log('andar aaya')

        cookieStore.set('token', '', {
            httpOnly: true,
            maxAge: 0,
            sameSite: "lax",
            path: '/'
        });

        return NextResponse.json(
            { msg: `logout success` },
            { status: 200 }
        );

    } catch (err) {

        console.log(err)
    }

}