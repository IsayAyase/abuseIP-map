import { create } from "zustand";
import { MapPropStoreType } from "./types";

export const useMapPropsStore = create<MapPropStoreType>((set, get) => ({
    currMouseCoords: null,
    zoom: 2,
    setCurrMouseCoords: (coords) => set({ currMouseCoords: coords }),
    setZoom: (zoom) => set({ zoom }),
}));
