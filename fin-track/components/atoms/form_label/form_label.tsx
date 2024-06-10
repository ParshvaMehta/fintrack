"use client";
import React from "react";

interface FormLabelProps {
	htmlFor: string;
	children: React.ReactNode;
}

const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children }) => {
	return (
		<label
			htmlFor={htmlFor}
			className="block text-gray-700 dark:text-dark-text mb-2"
		>
			{children}
		</label>
	);
};

export default FormLabel;
