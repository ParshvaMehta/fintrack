import { getUserByEmailPassword } from "@/services/users/users";
import { loginSchema } from "./login_schema";
import { errorHandler, successHandler } from "@/lib/response_handler";
import { signToken } from "@/lib/jwt";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		await loginSchema.parseAsync(body);
		const { email, password } = body;
		const user = await getUserByEmailPassword(email, password);
		if (!user) {
			return successHandler({}, "Invalid credentials", 401);
		}
		if (!user.email_verified || !user.is_active) {
			return successHandler({}, "User not verified", 401);
		}
		const token = await signToken({ user_id: user.id });
		console.log("User logged in", user, token);
		return successHandler({ user, token }, "Login success", 200);
	} catch (error) {
		return errorHandler(error);
	}
}
