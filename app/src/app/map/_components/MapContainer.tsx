"use client";

import { Card } from "@/components/ui/card";
import type { CoordOnlyInfoType } from "@/db/types";
import {
    useGetCoordsStore,
    useGetFullCoordInfoByIdStore,
} from "@/store/clientStore";
import {
    useMapConfigsStore,
    useMapPropsStore,
    useSideBarStore,
} from "@/store/stateStore";
import * as maptilersdk from "@maptiler/sdk";
import { Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const INITIAL_CENTER = [74, 24];

const LABEL_LAYERS = ["Country labels", "Continent labels", "Ocean labels"];

const ALL_LAYERS = [...LABEL_LAYERS];

const HIDE_TILE_ZOOM_LEVEL = 6;

const HOVER_POPUP_HEIGHT_PX = 40;
const HOVER_POPUP_WIDTH_PX = 110;

const MapContainer = () => {
    const { theme, systemTheme } = useTheme();
    const { coordsInfo } = useGetCoordsStore();
    const { setClickedPointId } = useGetFullCoordInfoByIdStore();
    const { zoom, setZoom, setCurrMouseCoords } = useMapPropsStore();
    const { coordinatesEnabled, heatmapEnabled, spinEnabled, globeEnabled } =
        useMapConfigsStore();
    const { setExpanded, setExpendDateSelector } = useSideBarStore();

    const mapRef = useRef<maptilersdk.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const userInteracting = useRef<boolean>(false);

    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [hoverPointsInFo, setHoverPointsInFo] =
        useState<CoordOnlyInfoType | null>(null);
    const [hoveredPointPos, setHoveredPointPos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [clickedCoords, setClickedCoords] =
        useState<CoordOnlyInfoType | null>(null);

    const calculateHoverPointPos = (X?: number, Y?: number) => {
        if (!X || !Y) {
            setHoveredPointPos(null);
            return;
        }

        let x = X + 10;
        let y = Y + 10;
        if (X >= document.body.clientWidth - HOVER_POPUP_WIDTH_PX - 10) {
            x = X - HOVER_POPUP_WIDTH_PX - 10;
        }
        if (Y >= document.body.clientHeight - HOVER_POPUP_HEIGHT_PX - 10) {
            y = Y - HOVER_POPUP_HEIGHT_PX - 10;
        }
        setHoveredPointPos({ x, y });
    };

    // map load
    useEffect(() => {
        if (!mapContainerRef.current) return;
        setMapLoaded(false);

        const style =
            theme === "system"
                ? systemTheme === "dark"
                    ? maptilersdk.MapStyle.DATAVIZ.DARK
                    : maptilersdk.MapStyle.DATAVIZ.LIGHT
                : theme === "dark"
                ? maptilersdk.MapStyle.DATAVIZ.DARK
                : maptilersdk.MapStyle.DATAVIZ.LIGHT;

        mapRef.current = new maptilersdk.Map({
            container: mapContainerRef.current as HTMLElement,
            center: INITIAL_CENTER as [number, number],
            zoom,
            style,
            hash: true,
            apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
            projection: globeEnabled ? "globe" : "mercator",
            interactive: true,
        });

        // to handle the zoom value from url!
        setZoom(mapRef.current.getZoom());

        function hideLabel(shouldHideLabels: boolean) {
            ALL_LAYERS.forEach((layerId) => {
                if (mapRef.current!.getLayer(layerId)) {
                    mapRef.current!.setLayoutProperty(
                        layerId,
                        "visibility",
                        shouldHideLabels ? "none" : "visible"
                    );
                }
            });
        }

        mapRef.current.on("move", () => {
            if (!mapRef.current) return;
            const mapZoom = mapRef.current.getZoom();
            setZoom(mapZoom);

            const shouldHideLabels = mapZoom < HIDE_TILE_ZOOM_LEVEL;
            hideLabel(shouldHideLabels);
        });

        mapRef.current.on("load", () => {
            if (!mapRef.current) return;
            setMapLoaded(true);
            hideLabel(true); // initial hide

            mapRef.current.addSource("coordinates", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [],
                },
            });

            mapRef.current.addLayer({
                id: "coordinates",
                type: "circle",
                source: "coordinates",
                paint: {
                    "circle-radius": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        1,
                        1,
                        3,
                        2,
                        5,
                        3,
                        7,
                        5,
                        11,
                        8,
                        13,
                        10,
                    ],
                    "circle-color": "#e7000b",
                },
            });

            mapRef.current.addLayer({
                id: "coordinates-heatmap",
                type: "heatmap",
                source: "coordinates",
                paint: {
                    "heatmap-weight": 1,
                    "heatmap-intensity": 0.2,
                    "heatmap-color": [
                        "interpolate",
                        ["linear"],
                        ["heatmap-density"],
                        0,
                        "rgba(33,102,172,0)",
                        0.2,
                        "rgba(103,169,207,0.1)",
                        0.4,
                        "rgba(209,229,240,0.2)",
                        0.6,
                        "rgba(253,219,199,0.3)",
                        0.8,
                        "rgba(239,138,98,0.4)",
                        1,
                        "rgba(178,24,43,0.5)",
                    ],
                },
            });

            mapRef.current.on("mousemove", (e) => {
                if (!mapRef.current) return;
                const x = e.originalEvent.clientX;
                const y = e.originalEvent.clientY;
                calculateHoverPointPos(x, y);

                setCurrMouseCoords([e.lngLat.lng, e.lngLat.lat]);

                const buffer = 5;
                const features = mapRef.current.queryRenderedFeatures(
                    [
                        [e.point.x - buffer, e.point.y - buffer],
                        [e.point.x + buffer, e.point.y + buffer],
                    ],
                    { layers: ["coordinates"] }
                );

                if (features.length > 0) {
                    const geometry = features[0].geometry as GeoJSON.Point;
                    const _id = features[0].properties?._id;
                    const coords = geometry.coordinates as [number, number];
                    setHoverPointsInFo({
                        _id,
                        coords: { lon: coords[0], lat: coords[1] },
                    });
                } else {
                    setHoverPointsInFo(null);
                }
            });

            mapRef.current.on("click", "coordinates", (e) => {
                if (!mapRef.current) return;

                const buffer = 5;
                const features = mapRef.current.queryRenderedFeatures(
                    [
                        [e.point.x - buffer, e.point.y - buffer],
                        [e.point.x + buffer, e.point.y + buffer],
                    ],
                    { layers: ["coordinates"] }
                );

                if (features.length > 0) {
                    const geometry = features[0].geometry as GeoJSON.Point;
                    const id = features[0].properties?._id;
                    const coords = geometry.coordinates as [number, number];

                    setClickedCoords({
                        _id: id,
                        coords: { lon: coords[0], lat: coords[1] },
                    });
                } else {
                    setClickedCoords(null);
                }
            });
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, [theme, globeEnabled]);

    // handling config changes
    useEffect(() => {
        if (!mapRef.current) return;
        if (!mapRef.current.loaded()) return;

        if (coordinatesEnabled) {
            mapRef.current.setLayoutProperty(
                "coordinates",
                "visibility",
                "visible"
            );
        } else {
            mapRef.current.setLayoutProperty(
                "coordinates",
                "visibility",
                "none"
            );
        }

        if (heatmapEnabled) {
            mapRef.current.setLayoutProperty(
                "coordinates-heatmap",
                "visibility",
                "visible"
            );
        } else {
            mapRef.current.setLayoutProperty(
                "coordinates-heatmap",
                "visibility",
                "none"
            );
        }
    }, [coordinatesEnabled, heatmapEnabled]);

    // spin animation
    useEffect(() => {
        if (!mapRef.current || !mapLoaded || !spinEnabled) return;

        const onInteractionStart = () => {
            userInteracting.current = true;
        };

        const onInteractionEnd = () => {
            userInteracting.current = false;
        };

        mapRef.current.on("mousedown", onInteractionStart);
        mapRef.current.on("touchstart", onInteractionStart);
        mapRef.current.on("mouseup", onInteractionEnd);
        mapRef.current.on("touchend", onInteractionEnd);

        // Use setInterval instead of requestAnimationFrame
        const spinInterval = setInterval(() => {
            if (!mapRef.current) return;
            const z = mapRef.current.getZoom();

            // Only spin if zoom < 3.5 and user not interacting
            if (z < 3.5 && !userInteracting.current) {
                const center = mapRef.current.getCenter();
                const currentLng = center.lng;
                const nextLng = (currentLng - 2) % 360;

                mapRef.current.easeTo({
                    center: [nextLng, center.lat],
                    duration: 1000,
                    easing: (t) => t,
                });
            }
        }, 1000); // Move every 1 second

        return () => {
            clearInterval(spinInterval);

            if (!mapRef.current) return;
            mapRef.current.off("mousedown", onInteractionStart);
            mapRef.current.off("touchstart", onInteractionStart);
            mapRef.current.off("mouseup", onInteractionEnd);
            mapRef.current.off("touchend", onInteractionEnd);
        };
    }, [spinEnabled, mapLoaded]);

    // update coordinates on map
    useEffect(() => {
        function updateCoordinates() {
            if (!mapRef.current) return;
            if (!mapLoaded) return;
            if (!coordsInfo || coordsInfo.length === 0) return;

            const geojson: GeoJSON.FeatureCollection = {
                type: "FeatureCollection",
                features: coordsInfo.map((cInfo, i) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [cInfo.coords.lon, cInfo.coords.lat],
                    },
                    properties: {
                        index: i + 1,
                        _id: cInfo._id,
                    },
                })),
            };

            const src = mapRef.current.getSource(
                "coordinates"
            ) as maptilersdk.GeoJSONSource;
            if (src) {
                src.setData(geojson);
            }
        }

        updateCoordinates();
    }, [coordsInfo, mapLoaded, theme]);

    // click center the point
    useEffect(() => {
        if (!mapRef.current || !clickedCoords) return;
        mapRef.current.flyTo({
            center: [clickedCoords.coords.lon, clickedCoords.coords.lat],
            zoom: 14,
        });

        setClickedPointId(clickedCoords._id);
        setExpanded(true);
        setExpendDateSelector(false);
        setClickedCoords(null);
    }, [clickedCoords]);

    return (
        <div className="fixed top-0 left-0 w-full h-full">
            <div
                id="map-container"
                className="w-full h-full relative cursor-grab focus-visible:outline-none"
                ref={mapContainerRef}
            ></div>

            <Plus className="absolute top-1/2 left-1/2 pointer-events-none translate-x-[-50%] translate-y-[-50%] text-foreground/40" />

            {hoveredPointPos && hoverPointsInFo && (
                <Card
                    className="bg-background text-foreground px-2 py-1 flex flex-col gap-0 justify-center text-xs rounded-md absolute z-50 font-mono"
                    style={{
                        width: `${HOVER_POPUP_WIDTH_PX}px`,
                        height: `${HOVER_POPUP_HEIGHT_PX}px`,
                        left: hoveredPointPos.x,
                        top: hoveredPointPos.y,
                    }}
                >
                    <p>
                        <span className="text-muted-foreground">Lon:</span>
                        {hoverPointsInFo.coords.lon.toFixed(4)}
                    </p>
                    <p>
                        <span className="text-muted-foreground">Lat:</span>
                        {hoverPointsInFo.coords.lat.toFixed(4)}
                    </p>
                </Card>
            )}
        </div>
    );
};

export default MapContainer;
