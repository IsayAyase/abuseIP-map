"use client";

import type { AbuseIpWithInfoType, CoordOnlyInfoType } from "@/db/types";

export async function getCoords(date: string): Promise<CoordOnlyInfoType[]> {
    const res = await fetch(`/api/coords?date=${date}`, { method: "GET" });
    const jsonData = await res.json();
    if (!jsonData.success)
        throw new Error("Something went wrong while calling coords api!");
    return jsonData.data;
}

export async function getFullCoordInfoById(
    id: string
): Promise<AbuseIpWithInfoType | null> {
    const res = await fetch(`/api/coords?id=${id}`, { method: "GET" });
    const jsonData = await res.json();
    if (!jsonData.success || !jsonData.data)
        throw new Error(
            jsonData.message ||
                "Something went wrong while calling coords by ID api!"
        );
    return jsonData.data;
}
