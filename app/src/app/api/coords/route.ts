import {
    getAbuseIpWithInfoById,
    getCoordsOnlyAbuseIpWithInfo,
} from "@/db/dbHelpers/abuseIpWithInfo";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");

    let data;
    if (id) {
        data = await getAbuseIpWithInfoById(id as string);
    } else {
        data = await getCoordsOnlyAbuseIpWithInfo();
    }

    return Response.json(
        { success: true, data },
        {
            status: 200,
        }
    );
}
