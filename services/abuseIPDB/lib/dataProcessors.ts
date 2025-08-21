import type {
    AbuseIPDBBlacklistDataType,
    AbuseIPDBBlacklistType,
    AbuseIpWithInfoType,
    IpInfoType,
} from "../types";

export const chuckIps = (
    data: AbuseIPDBBlacklistType,
    chunkSize: number = 100
): AbuseIPDBBlacklistDataType[][] => {
    const chunks: AbuseIPDBBlacklistDataType[][] = [];
    const ipsData = data.data;
    for (let i = 0; i < ipsData.length; i += 1) {
        if (i % chunkSize === 0) {
            chunks.push([]);
        }
        chunks[chunks.length - 1].push(ipsData[i]);
    }
    return chunks;
};

export const mergeAbuseIpdbAndIpInfo = (
    abuseIPData: AbuseIPDBBlacklistDataType[],
    ipInfo: IpInfoType[]
) => {
    const abuseIPMap = new Map<string, AbuseIPDBBlacklistDataType>();
    for (let i = 0; i < abuseIPData.length; i += 1) {
        abuseIPMap.set(abuseIPData[i].ipAddress, abuseIPData[i]);
    }

    const mergedData: AbuseIpWithInfoType[] = [];
    for (let i = 0; i < ipInfo.length; i += 1) {
        const ip = ipInfo[i].query;
        const abuseIp = abuseIPMap.get(ip);
        if (abuseIp) {
            mergedData.push({ ...abuseIp, ipInfo: ipInfo[i] });
        }
    }
    return mergedData;
};
