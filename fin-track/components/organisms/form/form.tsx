import React, { useReducer } from "react";
import FormField from "@/components/molecules/form_fields/form_fields";

interface FormFieldConfig {
	id: string;
	name: string;
	label: string;
	type: string;
	required?: boolean;
}

interface FormProps {
	fields: FormFieldConfig[];
	onSubmit: (data: Record<string, string>) => void;
}

type ActionType = { type: "UPDATE_FIELD"; name: string; value: string };

const formReducer = (state: Record<string, string>, action: ActionType) => {
	switch (action.type) {
		case "UPDATE_FIELD":
			return {
				...state,
				[action.name]: action.value,
			};
		default:
			return state;
	}
};

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
	const initialState = fields.reduce((acc, field) => {
		acc[field.name] = "";
		return acc;
	}, {} as Record<string, string>);

	const [formState, dispatch] = useReducer(formReducer, initialState);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "UPDATE_FIELD",
			name: e.target.name,
			value: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(formState);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white dark:bg-dark-muted p-8 rounded-md shadow-md w-full max-w-md"
		>
			{fields.map((field) => (
				<FormField
					key={field.id}
					id={field.id}
					name={field.name}
					label={field.label}
					type={field.type}
					value={formState[field.name]}
					onChange={handleInputChange}
					required={field.required}
				/>
			))}
			<button
				type="submit"
				className="w-full bg-light-primary dark:bg-dark-primary text-white py-2 rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-300"
			>
				Submit
			</button>
		</form>
	);
};

export default Form;
