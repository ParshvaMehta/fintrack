import { ZodError } from "zod";

export const errorHandler = (error: any) => {
	if (error instanceof ZodError) {
		console.error("Validation error:", error);
		return new Response(`${error?.errors[0].message}`, { status: 401 });
	}
	return new Response("Something went wrong!", { status: 500 });
};
