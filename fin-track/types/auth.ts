export interface loginPayload {
	email: string;
	password: string;
}

export interface signUpPayload {
	email: string;
	password: string;
	name: string;
	confirmPassword: string;
}

export interface signUpResponse {
	data: {
		id: number;
		email: string;
		name: string;
		is_active: boolean;
		email_verified: boolean;
		email_verified_at: any;
		created_at: string;
		updated_at: string;
	};
	message: string;
}
