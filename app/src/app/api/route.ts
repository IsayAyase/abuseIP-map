import type { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
    return Response.json(
        { success: true, message: "API is working!" },
        {
            status: 200,
        }
    );
}
