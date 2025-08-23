import { getDataStoreValueFromDB } from "@/db/dbHelpers/dataStore";

export async function GET() {
    const data = await getDataStoreValueFromDB("abuseIpGeneratedAt");
    return Response.json(
        { success: true, data: data.updatedAt },
        {
            status: 200,
        }
    );
}
