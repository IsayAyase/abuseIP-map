export type AbuseIPDBBlacklistDataType = {
    ipAddress: string;
    countryCode: string;
    abuseConfidenceScore: number;
    lastReportedAt: Date;
};

export type AbuseIPDBBlacklistType = {
    meta: {
        generatedAt: Date;
    };
    data: AbuseIPDBBlacklistDataType[];
};

export type IpInfoType = {
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    query: string;
};

export type AbuseIpWithInfoType = AbuseIPDBBlacklistDataType & {
    ipInfo: IpInfoType;
};
