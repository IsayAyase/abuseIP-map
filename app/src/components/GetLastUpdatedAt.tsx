import { getLastUpdatedAt } from "@/app/map/_lib/clientApiCalls";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const GetLastUpdatedAt = ({ className }: { className?: string }) => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        if (date) return;

        const fetch = async () => {
            const date = await getLastUpdatedAt();
            setDate(date);
        };
        fetch();
    }, [date]);

    if (!date) return null;
    return (
        <div className={`text-xs ${className}`}>
            last updated at:{" "}
            {dayjs(new Date(date)).format("MMM DD, hh:mm:ss A")}
        </div>
    );
};

export default GetLastUpdatedAt;
