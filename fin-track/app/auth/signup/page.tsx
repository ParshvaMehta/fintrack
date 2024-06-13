"use client";
import Form from "@/components/organisms/form/form";
import { API_URL, APP_ROUTE } from "@/lib/constant";
import httpService from "@/lib/client/http";
import { signUpPayload, signUpResponse } from "@/types/auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
const SignUp = () => {
	const router = useRouter();
	const [disable, setDisable] = useState(false);
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
	const handleSignUpSubmit = async (data: signUpPayload) => {
		setDisable(true);
		if (data.password !== data.confirmPassword) {
			toast.error("Password not matched!");
			setDisable(false);
			return;
		}
		try {
			const { data: response } = (await httpService.post(
				API_URL.AUTH.SIGNUP,
				data
			)) as unknown as signUpResponse;
			console.error(response, "response");
			toast.success("User created!");
			setDisable(false);
			router.push(
				`${APP_ROUTE.AUTH.VERIFY_TOKEN}?email=${encodeURIComponent(
					response.email
				)}&userId=${response.id}`
			);
		} catch (error) {
			if (error instanceof AxiosError) {
				let errMsg = error?.message;
				if (error.response?.data.message) {
					errMsg = error.response?.data.message;
				}
				toast.error(errMsg);
				setDisable(false);
				return;
			}
			console.error(error);
			toast.error("Not able to create user!");
			setDisable(false);
			return;
		} finally {
			setDisable(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text flex-col">
			<h2 className="text-2xl font-bold mb-4">Sign Up</h2>
			<Form
				fields={formFields}
				onSubmit={(payload) =>
					handleSignUpSubmit(payload as unknown as signUpPayload)
				}
				disable={disable}
			/>
		</div>
	);
};

export default SignUp;
