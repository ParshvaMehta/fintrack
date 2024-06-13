import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { verifyToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	if (!token) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}
	try {
		await verifyToken(token); // Verify the token
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}
}

export const config = {
	matcher: ["/app"],
};
