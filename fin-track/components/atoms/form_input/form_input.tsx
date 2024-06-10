import React from "react";

interface FormInputProps {
	id: string;
	name: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
	id,
	name,
	type,
	value,
	onChange,
	required = false,
}) => {
	return (
		<input
			id={id}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
			required={required}
			className="w-full mt-1 p-2 border rounded-md bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
		/>
	);
};

export default FormInput;
