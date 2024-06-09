import prisma from "@/lib/prisma";

export const deleteTokenById = async (id: number) => {
	// delete token
	return await prisma.token.delete({
		where: {
			id,
		},
	});
};
