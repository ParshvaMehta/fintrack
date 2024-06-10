"use client";
import Form from "@/components/organisms/form/form";
import { API_URL } from "@/lib/constant";
import httpService from "@/lib/http";
import { toast } from "react-toastify";
const Signup = () => {
	const formFields = [
		{
			id: "name",
			name: "name",
			label: "Full Name",
			type: "text",
			required: true,
		},
		{
			id: "email",
			name: "email",
			label: "Email",
			type: "email",
			required: true,
		},
		{
			id: "password",
			name: "password",
			label: "Password",
			type: "password",
			required: true,
		},
		{
			id: "confirmPassword",
			name: "confirmPassword",
			label: "Confirm Password",
			type: "password",
			required: true,
		},
	];
	const notify = () => toast("Wow so easy!");

	const handleSignupSubmit = async (data: Record<string, string>) => {
		console.log("Form Data:", data);
		if (data.password !== data.confirmPassword) {
			// setError("Passwords do not match");
			return;
		}
		try {
			const response = await httpService.post(API_URL.AUTH.SIGNUP, data);
			console.log("Signup response:", response);
			// setSuccess(
			// 	"Signup successful! Please check your email for verification."
			// );
			// setError("");
		} catch (error) {
			// setError("Signup failed. Please try again.");
			// setSuccess("");
		}

		// Handle form submission here, e.g., by making an API call
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
			<Form fields={formFields} onSubmit={handleSignupSubmit} />
			<button onClick={notify}>Notify!</button>
		</div>
	);
};

export default Signup;
