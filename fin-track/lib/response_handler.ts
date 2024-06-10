import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const errorHandler = (error: any) => {
	console.error("Error:", error);
	if (error instanceof ZodError) {
		console.error("Validation error:", error);
		return new Response(`${error?.errors[0].message}`, { status: 400 });
	}
	if (error instanceof AxiosError) {
		console.error("Axios error:", error);
		return new Response(`${error?.response?.data?.message}`, {
			status: error?.response?.status,
		});
	}
	console.error("Something went wrong!", error);
	return new Response("Something went wrong!", { status: 500 });
};

export const successHandler = (
	data: any,
	message = "Success",
	status = 200
) => {
	return NextResponse.json({ data, message }, { status });
};
