import prisma from "@/lib/prisma";

export const updateSingleUserById = async (user_id: number, data: any) => {
	const user = await prisma.user.update({
		where: {
			id: user_id,
		},
		select: {
			id: true,
			email: true,
			email_verified: true,
			is_active: true,
			name: true,
		},
		data,
	});

	return user;
};

export const getUserByEmailPassword = (email: string, password: string) => {
	const user = prisma.user.findFirst({
		select: {
			id: true,
			email: true,
			email_verified: true,
			is_active: true,
			name: true,
		},
		where: {
			email,
			password,
		},
	});
	return user;
};
