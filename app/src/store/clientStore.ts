import { create } from "zustand";
import {
    GetCoordsStoreType,
    type GetFullCoordInfoByIdStoreType,
} from "./types";

export const useGetCoordsStore = create<GetCoordsStoreType>((set, get) => ({
    coordsInfo: undefined,
    loading: false,
    error: null,

    setCoordsInfo: (coords) => set({ coordsInfo: coords }),
    isInfoFetched: () => {
        const coordsInfo = get().coordsInfo;
        return !!(coordsInfo === null || Array.isArray(coordsInfo));
    },
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));

export const useGetFullCoordInfoByIdStore =
    create<GetFullCoordInfoByIdStoreType>((set, get) => ({
        clickedPointId: null,
        infos: {},
        loading: false,
        error: null,

        isInfoFetched: (id) => {
            const info = get().infos;
            return !!(info[id] === null || typeof info[id] === "object");
        },
        setClickedPointId: (id) => set({ clickedPointId: id }),
        setInfos: (id, info) =>
            set((state) => ({
                infos: { ...state.infos, [id]: info },
            })),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
    }));
