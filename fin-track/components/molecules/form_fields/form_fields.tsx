import React from "react";
import FormLabel from "@/components/atoms/form_label/form_label";
import FormInput from "@/components/atoms/form_input/form_input";

interface FormFieldProps {
	id: string;
	name: string;
	label: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
	id,
	name,
	label,
	type,
	value,
	onChange,
	required,
}) => {
	return (
		<div className="mb-4">
			<FormLabel htmlFor={id}>{label}</FormLabel>
			<FormInput
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				required={required}
			/>
		</div>
	);
};

export default FormField;
