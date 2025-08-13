import fs from "fs";
import { progressBar } from "../lib/progressBar";
import { sleep } from "../lib/sleep";
import type { IpInfoType } from "../types";

export const getIpInfoForIpChunks = async (
    ipsChunks: string[][]
): Promise<IpInfoType[]> => {
    if (fs.existsSync("./ipInfo.json")) {
        console.log("Using cached ipInfo");
        return JSON.parse(fs.readFileSync("./ipInfo.json").toString());
    }

    const data: IpInfoType[] = [];
    const url = `http://ip-api.com/batch?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,query`;

    for (let i = 0; i < ipsChunks.length; i += 1) {
        progressBar(i, ipsChunks.length);
        const ips = ipsChunks[i];
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
            const res = await response.json();
            data.push(...res);
        } catch (error) {
            console.error("Error fetching blacklist:", error);
        }
        sleep(5000);
    }
    return data;
};
