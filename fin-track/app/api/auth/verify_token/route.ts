import { errorHandler, successHandler } from "@/lib/response_handler";
import { verifyTokenSchema } from "./token_schema";
import prisma from "@/lib/prisma";

const deleteTokenById = async (id: number) => {
	// delete token
	return await prisma.token.delete({
		where: {
			id,
		},
	});
};

export async function POST(request: Request) {
	try {
		const body = await request.json();
		await verifyTokenSchema.parseAsync(body);
		const { user_id, token, type } = body;
		const userToken = await prisma.token.findFirst({
			where: {
				user_id,
				token,
				type,
			},
		});
		if (!userToken) {
			return successHandler({}, "Token not found", 404);
		}
		const now = new Date();
		if (userToken && userToken.expires && userToken?.expires < now) {
			await deleteTokenById(userToken?.id);
			return successHandler({}, "Token expires!", 400);
		}

		// Update user status
		const user = await prisma.user.update({
			where: {
				id: user_id,
			},
			data: {
				email_verified: true,
				email_verified_at: new Date(),
				is_active: true,
			},
		});
		// delete token
		await deleteTokenById(userToken?.id);
		return successHandler(user, "User verified", 200);
	} catch (error) {
		return errorHandler(error);
	}
}
