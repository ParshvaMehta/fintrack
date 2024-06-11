"use client";
import React, { useReducer, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import httpService from "@/lib/http";
import storageService from "@/lib/storage";
import FormLabel from "@/components/atoms/form_label/form_label";
import { AxiosError } from "axios";
import { API_URL, APP_ROUTE } from "@/lib/constant";

interface State {
	otp: string[];
}

type Action = { type: "SET_OTP"; index: number; value: string };

const initialState: State = {
	otp: ["", "", "", "", "", ""],
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_OTP":
			const newOtp = [...state.otp];
			newOtp[action.index] = action.value;
			return { ...state, otp: newOtp };
		default:
			return state;
	}
};

const maskEmail = (email: string) => {
	const [localPart, domainPart] = email.split("@");
	const maskedLocalPart = localPart[0] + "***" + localPart.slice(-1);
	return `${maskedLocalPart}@${domainPart}`;
};

const OTPVerification: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const router = useRouter();
	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
	const searchParams = useSearchParams();
	const email = searchParams.get("email") || "";
	const userId = searchParams.get("userId") || "";

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { value } = e.target;
		if (/^\d?$/.test(value)) {
			// Allow only digits
			dispatch({ type: "SET_OTP", index, value });

			// Move to the next input if a digit is entered
			if (value && index < 5) {
				inputsRef.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === "Backspace" && !state.otp[index]) {
			if (index > 0) {
				dispatch({ type: "SET_OTP", index: index - 1, value: "" });
				inputsRef.current[index - 1]?.focus();
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const combinedOtp = state.otp.join("");
		if (combinedOtp.length !== 6) {
			toast.error("OTP must be 6 digits.");
			return;
		}
		try {
			await httpService.post(API_URL.AUTH.VERIFY_TOKEN, {
				token: combinedOtp.toString().trim(),
				user_id: parseInt(userId),
				type: "EMAIL_VERIFICATION",
			});
			toast.success("OTP Verified, You can login now!");
			router.push(APP_ROUTE.AUTH.LOGIN); // Redirect to dashboard or another page after successful verification
		} catch (error) {
			if (error instanceof AxiosError) {
				let errMsg = error?.message;
				if (error.response?.data.message) {
					errMsg = error.response?.data.message;
				}
				toast.error(errMsg);
				return;
			}
			console.error(error);
			toast.error("Not able to create user!");
			toast.error("Invalid OTP. Please try again.");
		}
	};

	const isButtonDisabled = state.otp.some((digit) => digit === "");

	return (
		<div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text flex-col">
			<h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
			<p className="mb-4">
				Please enter the 6-digit OTP sent to your email address:{" "}
				<strong>{maskEmail(email)}</strong>
			</p>
			<form
				onSubmit={handleSubmit}
				className="bg-white dark:bg-dark-muted p-8 rounded-md shadow-md w-full max-w-md"
			>
				<FormLabel htmlFor="OTP">OTP has been sent to </FormLabel>
				<div className="mb-4 flex space-x-2">
					{state.otp.map((digit, index) => (
						<input
							key={index}
							type="text"
							value={digit}
							onChange={(e) => handleChange(e, index)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							maxLength={1}
							className="w-12 p-2 text-center border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
							ref={(el) => (inputsRef.current[index] = el)}
							required
						/>
					))}
				</div>
				<button
					type="submit"
					className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 ${
						isButtonDisabled
							? "bg-gray-400 cursor-not-allowed"
							: "bg-indigo-600 text-white hover:bg-indigo-700"
					}`}
					disabled={isButtonDisabled}
				>
					Verify OTP
				</button>
			</form>
		</div>
	);
};

export default OTPVerification;
