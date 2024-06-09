import z from "zod";

export const loginSchema = z.object({
	email: z
		.string({
			required_error: "Email required",
		})
		.email("Invalid email"),
	password: z
		.string({
			required_error: "Password required",
			invalid_type_error: "Password must be a string",
		})
		.min(6, {
			message: "Password must be 6 character long",
		}),
});
