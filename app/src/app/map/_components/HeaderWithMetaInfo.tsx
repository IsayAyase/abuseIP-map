"use client";

import { Separator } from "@/components/ui/separator";
import { useMapPropsStore } from "@/store/stateStore";

const HeaderWithMetaInfo = () => {
    const { currMouseCoords, zoom } = useMapPropsStore();
    return (
        <div className="absolute top-0 left-0 z-10 px-6 py-4">
            <h3 className="text-5xl md:text-6xl">coordinates</h3>
            <Separator className="my-1 bg-foreground/30" />
            <div className="flex items-center gap-0.5 text-xs">
                <p>lon: {currMouseCoords?.[0].toFixed(4)}</p>
                <span>•</span>
                <p>lat: {currMouseCoords?.[1].toFixed(4)}</p>
                <span>•</span>
                <p>zoom: {zoom.toFixed(2)}</p>
            </div>
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `radial-gradient(circle 400px at 0% 50%, var(--background), transparent)`,
                }}
            />
        </div>
    );
};

export default HeaderWithMetaInfo;
