import { getLastUpdatedAt } from "@/app/map/_lib/clientApiCalls";
import { formatDistance } from "date-fns/fp";
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
            updated: {formatDistance(new Date(date), new Date())} ago
        </div>
    );
};

export default GetLastUpdatedAt;
