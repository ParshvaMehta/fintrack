export async function POST(request: Request) {
	// const { email, password } = req.body;
	const { email, password } = await request.json();

	return Response.json({ email, password });
}
