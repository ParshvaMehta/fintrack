import z from "zod";

export const verifyTokenSchema = z.object({
	user_id: z.number({
		required_error: "User id required",
	}),
	type: z.enum(["EMAIL_VERIFICATION", "RESET_PASSWORD"]),
	token: z.string({
		required_error: "Token required",
	}),
});
