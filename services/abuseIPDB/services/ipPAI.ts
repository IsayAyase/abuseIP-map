import type { IpInfoType } from "../types";

export const fetchBulkIpInfo = async (ips: string[]): Promise<IpInfoType[]> => {
    if (ips.length === 0) {
        return [];
    }
    const url = `http://ip-api.com/batch?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,query`;
    try {
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify(ips),
        });
        if (!response.ok) {
            throw new Error(
                JSON.stringify({
                    statusText: response.statusText,
                    status: response.status,
                })
            );
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching blacklist:", error);
        return [];
    }
};
