"use client";

import { Button } from "@/components/ui/button";
import { useMapConfigsStore } from "@/store/stateStore";

export const MapDataVisConfigs = () => {
    const {
        coordinatesEnabled,
        heatmapEnabled,
        toggleCoordinates,
        toggleHeatmap,
    } = useMapConfigsStore();
    return (
        <div className="py-1 mx-4 grid grid-cols-2 items-center gap-4">
            <Button
                data-active={heatmapEnabled}
                variant={"activeMode"}
                className="text-xs h-6"
                size={"sm"}
                onClick={() => {
                    toggleHeatmap();
                }}
            >
                Heatmap
            </Button>
            <Button
                data-active={coordinatesEnabled}
                variant={"activeMode"}
                className="text-xs h-6"
                size={"sm"}
                onClick={() => {
                    toggleCoordinates();
                }}
            >
                Coords
            </Button>
        </div>
    );
};

export const MapGlobeConfigs = () => {
    const { spinEnabled, toggleSpin, globeEnabled, toggleGlobe } =
        useMapConfigsStore();
    return (
        <div className="py-1 mx-4 grid grid-cols-2 items-center gap-4">
            <Button
                variant={"activeMode"}
                className="text-xs h-6"
                size={"sm"}
                onClick={() => {
                    toggleSpin();
                }}
                data-active={spinEnabled}
            >
                Spin Globe
            </Button>
            <Button
                variant={"activeMode"}
                className="text-xs h-6"
                size={"sm"}
                onClick={() => {
                    toggleGlobe();
                }}
                data-active={globeEnabled}
            >
                Globe View
            </Button>
        </div>
    );
};
