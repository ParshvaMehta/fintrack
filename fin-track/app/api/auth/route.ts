import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest) {
	return Response.json({ message: "GET /api/auth" });
}
