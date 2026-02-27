import { cookies } from "next/headers"
import { NextResponse, userAgent } from "next/server"
import jwt from "jsonwebtoken"
import { generateAccessToken } from "@/app/api/services/authentication"
import User from "@/app/api/Models/usersModel"

export async function GET() {

    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("token")?.value

    if (!refreshToken)
        return NextResponse.json({ message: "No token" }, { status: 401 })

    try {
        const decoded: any = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESS_TOKEN_SECRET as string
        )

        const user = await User.findById(decoded.id).select('_id fullName email gender')


        const { accessToken } =
            generateAccessToken(user)

        const response = NextResponse.json({
            user,
            accessToken,
        }, {
            status: 200
        })

        return response
    } catch {
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 403 }
        )
    }
}