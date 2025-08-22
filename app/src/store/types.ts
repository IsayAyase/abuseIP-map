import type { AbuseIpWithInfoType, CoordOnlyInfoType } from "@/db/types";

export type GetCoordsStoreType = {
    coordsInfo: CoordOnlyInfoType[] | null | undefined;
    loading: boolean;
    error: string | null;

    setCoordsInfo: (coords: CoordOnlyInfoType[] | null | undefined) => void;
    isInfoFetched: () => boolean;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

export type GetFullCoordInfoByIdStoreType = {
    clickedPointId: string | null;
    infos: Record<string, AbuseIpWithInfoType | null>;
    loading: boolean;
    error: string | null;

    isInfoFetched: (id: string) => boolean;
    setClickedPointId: (id: string | null) => void;
    setInfos: (id: string, info: AbuseIpWithInfoType | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

export type SideBarStoreType = {
    expanded: boolean;
    toggle: () => void;
    setExpanded: (expanded: boolean) => void;

    expendDateSelector: boolean;
    toggleExpendDateSelector: () => void;
    setExpendDateSelector: (expend: boolean) => void;
};

export type MapPropStoreType = {
    currMouseCoords: [number, number] | null;
    zoom: number;

    setCurrMouseCoords: (coords: [number, number] | null) => void;
    setZoom: (zoom: number) => void;
};

export type MapConfigsStoreType = {
    globeEnabled: boolean;
    spinEnabled: boolean;
    heatmapEnabled: boolean;
    coordinatesEnabled: boolean;

    toggleGlobe: () => void;
    toggleSpin: () => void;
    toggleHeatmap: () => void;
    toggleCoordinates: () => void;
};
