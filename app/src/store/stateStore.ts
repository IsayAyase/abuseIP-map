import { create } from "zustand";
import {
    MapPropStoreType,
    type MapConfigsStoreType,
    type SideBarStoreType,
} from "./types";

export const useSideBarStore = create<SideBarStoreType>((set) => ({
    expanded: false,
    toggle: () => set((state) => ({ expanded: !state.expanded })),
    setExpanded: (expanded) => set({ expanded }),

    expendDateSelector: false,
    toggleExpendDateSelector: () =>
        set((state) => ({ expendDateSelector: !state.expendDateSelector })),
    setExpendDateSelector: (expend) => set({ expendDateSelector: expend }),
}));

export const useMapPropsStore = create<MapPropStoreType>((set) => ({
    currMouseCoords: null,
    zoom: 2,
    setCurrMouseCoords: (coords) => set({ currMouseCoords: coords }),
    setZoom: (zoom) => set({ zoom }),
}));

export const useMapConfigsStore = create<MapConfigsStoreType>((set) => ({
    globeEnabled: true,
    spinEnabled: true,
    heatmapEnabled: true,
    coordinatesEnabled: true,

    toggleGlobe: () =>
        set((state) => ({
            globeEnabled: !state.globeEnabled,
        })),
    toggleSpin: () =>
        set((state) => ({
            spinEnabled: !state.spinEnabled,
        })),
    toggleHeatmap: () =>
        set((state) => ({
            heatmapEnabled: !state.heatmapEnabled,
        })),
    toggleCoordinates: () =>
        set((state) => ({
            coordinatesEnabled: !state.coordinatesEnabled,
        })),
}));
