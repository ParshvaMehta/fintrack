"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import httpService from "@/lib/client/http";
import storageService from "@/lib/client/storage";
import { API_URL } from "@/lib/constant";
import Form from "@/components/organisms/form/form";
import { loginPayload } from "@/types/auth";
import Cookies from "js-cookie";

const Login: React.FC = () => {
	const [disable, setDisable] = useState(false);
	const router = useRouter();

	const formFields = [
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
	];

	const handleSubmit = async (data: loginPayload) => {
		try {
			const response = await httpService.post(API_URL.AUTH.LOGIN, data);
			if (!response) {
				return;
			}
			storageService.setItem("user", JSON.stringify(response.data.user));
			storageService.setItem("token", response.data.token);
			Cookies.set("token", token, { expires: 7 });
			toast.success("Login successful!");
			router.push("/app/dashboard"); // Redirect to dashboard after successful login
		} catch (err) {
			toast.error("Login failed. Please check your email and password.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text flex-col">
			<h2 className="text-2xl font-bold mb-4">Sign Up</h2>
			<Form
				fields={formFields}
				onSubmit={(payload) => handleSubmit(payload as unknown as loginPayload)}
				disable={disable}
			/>
		</div>
	);
};

export default Login;
