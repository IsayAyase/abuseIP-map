import type { AbuseIpWithInfoType, CoordOnlyInfoType } from "@/db/types";

export type GetCoordsStoreType = {
    selectedDate: string | null;
    // id -> []
    coordsInfo: Record<string, CoordOnlyInfoType[] | null>;
    loading: boolean;
    error: string | null;

    setSelectedDate: (date: string | null) => void;
    setCoordsInfo: (date: string, coords: CoordOnlyInfoType[] | null) => void;
    isInfoFetched: (date: string) => boolean;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

export type GetFullCoordInfoByIdStoreType = {
    clickedPointId: string | null;
    infos: Record<string, AbuseIpWithInfoType | null>;
    loading: boolean;
    error: string | null;

    isInfoFetched: (date: string) => boolean;
    setClickedPointId: (id: string | null) => void;
    setInfos: (id: string, info: AbuseIpWithInfoType | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

export type MapPropStoreType = {
    currMouseCoords: [number, number] | null;
    zoom: number;

    setCurrMouseCoords: (coords: [number, number] | null) => void;
    setZoom: (zoom: number) => void;
};
