export async function GET(request: Request) {
  const response = Response.json(
    {
      message: "ciao",
    },
    { status: 400 },
  );
  return response;
}
