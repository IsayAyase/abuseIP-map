import {
    getAbuseIpWithInfoById,
    getCoordsOnlyAbuseIpWithInfo,
} from "@/db/dbHelpers/abuseIpWithInfo";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    const date = request.nextUrl.searchParams.get("date");

    let data;
    if (date) {
        data = await getCoordsOnlyAbuseIpWithInfo(date as string);
    } else if (id) {
        data = await getAbuseIpWithInfoById(id as string);
    }

    return Response.json(
        { success: true, data },
        {
            status: 200,
        }
    );
}
