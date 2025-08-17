import { getAbuseIpWithInfo } from "@/db/dbHelpers/abuseIpWithInfo";

const Page = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const data = await getAbuseIpWithInfo(yesterday);
    return (
        <div className="flex flex-col gap-4">
            {data.map((entry) => (
                <div
                    key={entry._id}
                    className="px-2 py-1 rounded-md border border-border"
                >
                    <p>{entry.ipInfo.lat}</p>
                    <p>{entry.ipInfo.lon}</p>
                </div>
            ))}
        </div>
    );
};

export default Page;
