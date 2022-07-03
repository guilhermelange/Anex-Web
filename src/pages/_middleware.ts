import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from "next/server"
// import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const publicRoutes = [
        '/signin',
        '/signup'
    ]

    if (!publicRoutes.includes(req.nextUrl.pathname)) {
        const token = req.cookies['nextauth.token'];
        const { origin } = req.nextUrl
        // const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';

        if (!token) {
            return NextResponse.redirect(`${origin}/signin`)
        } 
        // else {
        //     try {
        //         jwt.verify(token, secret)
        //     } catch(error) {
        //         return NextResponse.redirect(`${origin}/signin`)
        //     }
        // }
    }
}