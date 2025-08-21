"use client";

import { Button } from "@/components/ui/button";
import { useMapConfigsStore } from "@/store/stateStore";

const MapConfigs = () => {
    const {
        coordinatesEnabled,
        heatmapEnabled,
        setBothEnabled,
        toggleCoordinates,
        toggleHeatmap,
    } = useMapConfigsStore();
    return (
        <div className="border border-border rounded-lg p-1 grid grid-cols-3 items-center gap-1">
            <Button
                data-active={heatmapEnabled && !coordinatesEnabled}
                variant={"ghost"}
                className="text-xs h-6 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                size={"sm"}
                onClick={() => {
                    toggleHeatmap();
                }}
            >
                Heatmap
            </Button>
            <Button
                data-active={coordinatesEnabled && !heatmapEnabled}
                variant={"ghost"}
                className="text-xs h-6 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                size={"sm"}
                onClick={() => {
                    toggleCoordinates();
                }}
            >
                Coordinates
            </Button>
            <Button
                data-active={coordinatesEnabled && heatmapEnabled}
                variant={"ghost"}
                className="text-xs h-6 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                size={"sm"}
                onClick={() => {
                    setBothEnabled();
                }}
            >
                Both
            </Button>
        </div>
    );
};

export default MapConfigs;
