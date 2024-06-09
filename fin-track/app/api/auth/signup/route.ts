import { sendMail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { generateOTP } from "@/lib/utils";
import fs from "fs";
import { signupSchema } from "./signup_schema";
import { successHandler, errorHandler } from "@/lib/response_handler";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		await signupSchema.parseAsync(body);
		const { email, password, name } = body;

		// Check is user exists or not.
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			// return new Response("Email already exists", { status: 409 });
			return successHandler({}, "Email already exists", 409);
		}

		// Create User
		const user = await prisma.user.create({
			data: {
				email,
				password,
				name,
			},
		});
		// Generate OTP
		const OTP = generateOTP();
		// expires after 7 days
		const expires = new Date();
		expires.setDate(expires.getDate() + 7);
		// save OTP to database
		await prisma.token.create({
			data: {
				token: OTP.toString(),
				user_id: user.id,
				expires,
			},
		});

		// send OTP to email
		const emailTemplate = await fs
			.readFileSync("components/email_template/email_verify.html")
			.toString()
			.replace("[OTP]", OTP.toString())
			.replace("[User]", name)
			.replace("[Expires]", expires.toISOString());
		await sendMail(email, "OTP Verification", emailTemplate);
		return successHandler(user, "User Created", 201);
	} catch (error) {
		return errorHandler(error);
	}
}
