"use client";

import LoadingCircle from "@/components/ui/LoadingCircle";
import { useGetFullCoordInfoByIdStore } from "@/store/clientStore";
import dayjs from "dayjs";
import { useEffect } from "react";
import { getFullCoordInfoById } from "../_lib/clientApiCalls";

const FullIpInfo = () => {
    const {
        clickedPointId,
        loading,
        infos,
        setInfos,
        setLoading,
        setError,
        isInfoFetched,
    } = useGetFullCoordInfoByIdStore();

    // Fetch full coordinate info when a point is clicked
    useEffect(() => {
        if (!clickedPointId || loading || isInfoFetched(clickedPointId)) {
            return;
        }

        const fetchFullCoordInfo = async () => {
            try {
                setLoading(true);
                const res = await getFullCoordInfoById(clickedPointId);
                if (res) {
                    setInfos(clickedPointId, res);
                } else {
                    setError("No coordinate info found for the clicked point.");
                }
            } catch (error: any) {
                console.error("Error fetching full coordinate info:", error);
                setError(error.message || "Failed to fetch coordinate info.");
            }
            setLoading(false);
        };

        fetchFullCoordInfo();
    }, [clickedPointId]);

    if (!clickedPointId) {
        return (
            <div className="text-sm text-right mx-4">
                {"Click on a coord point!"}
            </div>
        );
    } else if (loading) {
        return (
            <div className="text-center flex justify-between items-center gap-2 px-4">
                <h4 className="text-sm font-semibold">IP Information</h4>
                <LoadingCircle className="size-4" />
            </div>
        );
    } else if (!infos[clickedPointId]) {
        return (
            <div className="text-sm text-right mx-4">
                {"No coordinate info found!"}
            </div>
        );
    }
    const info = infos[clickedPointId];
    const data = [
        {
            label: "IP Address",
            value: info.ipAddress,
        },
        {
            label: "Last Reported At",
            value: dayjs(info.lastReportedAt).format("YYYY-MM-DD hh:mm:ss A"),
        },
        {
            label: "Abuse Confidence Score",
            value: info.abuseConfidenceScore.toString(),
        },
        {
            label: "Longitude",
            value: info.ipInfo.lon,
        },
        {
            label: "Latitude",
            value: info.ipInfo.lat,
        },
        {
            label: "Country",
            value: `${info.ipInfo.country}${
                info.ipInfo.countryCode
                    ? " (" + info.ipInfo.countryCode + ")"
                    : ""
            }`,
        },
        {
            label: "Region",
            value: `${info.ipInfo.regionName}${
                info.ipInfo.region ? " (" + info.ipInfo.region + ")" : ""
            }`,
        },
        {
            label: "City",
            value: info.ipInfo.city,
        },
        {
            label: "Zip Code",
            value: info.ipInfo.zip,
        },
        {
            label: "Timezone",
            value: info.ipInfo.timezone,
        },
        {
            label: "ISP",
            value: info.ipInfo.isp,
        },
    ];
    return (
        <div className="w-full flex flex-col gap-2 justify-center text-xs text-left px-4">
            <h4 className="text-sm font-semibold">IP Information</h4>
            <div className="flex flex-col justify-center">
                {data.map((item, idx) => (
                    <div
                        key={item.label}
                        className={`grid grid-cols-2 gap-1 w-full ${
                            idx === data.length - 1 ? "border-y" : "border-t"
                        } border-x border-border`}
                    >
                        <p className="w-full border-r border-border p-1">
                            {item.label}
                        </p>
                        <p className="w-full font-normal p-1">
                            {item.value || "-"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FullIpInfo;
