"use client";

import LoadingCircle from "@/components/ui/LoadingCircle";
import {
    useGetCoordsStore,
    useGetFullCoordInfoByIdStore,
} from "@/store/clientStore";
import { useMapPropsStore } from "@/store/stateStore";

const HeaderWithMetaInfo = () => {
    const { currMouseCoords, zoom } = useMapPropsStore();
    const { loading: coordsLoading } = useGetCoordsStore();
    const { loading: infoLoading } = useGetFullCoordInfoByIdStore();
    return (
        <div className="absolute top-0 left-0 z-10 px-6 py-4 h-full w-full pointer-events-none">
            <h3 className="text-5xl md:text-6xl pr-20 text-foreground/90">
                mapware24
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-0.5 text-xs">
                <div className="flex items-center gap-0.5 text-xs">
                    <p>lon: {currMouseCoords?.[0].toFixed(4) || 0}</p>
                    <span>•</span>
                    <p>lat: {currMouseCoords?.[1].toFixed(4) || 0}</p>
                    <span>•</span>
                    <p>zoom: {zoom.toFixed(2)}</p>
                </div>
                {(coordsLoading || infoLoading) && (
                    <div className="mx-2 flex items-center gap-1">
                        <LoadingCircle className="size-4" />
                        {coordsLoading && <span>loading coordinates...</span>}
                        {infoLoading && <span>loading info...</span>}
                    </div>
                )}
            </div>
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage:
                        "radial-gradient(ellipse 600px 200px at 0% 0%, color-mix(in oklab, var(--background) 60%, transparent) 50%, transparent)",
                }}
            />
        </div>
    );
};

export default HeaderWithMetaInfo;
// rgb(254, 154, 0, 0.5)
