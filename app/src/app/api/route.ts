import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    return Response.json(
        { success: true, message: "API is working!" },
        {
            status: 200,
        }
    );
}
