import JWT from "jsonwebtoken";
const { JWT_SECRET } = process.env;
export const signToken = async (payload: any) => {
	if (!JWT) {
		throw new Error("JWT is not initialized");
	}
	const token = await JWT.sign(payload, JWT_SECRET, {
		expiresIn: "1d",
	});

	return token;
};

export const verifyToken = async (token: string) => {
	if (!JWT) {
		throw new Error("JWT is not initialized");
	}
	const payload = await JWT.verify(token, JWT_SECRET);
	return payload;
};
