import { create } from "zustand";
import {
    GetCoordsStoreType,
    type GetFullCoordInfoByIdStoreType,
} from "./types";

export const useGetCoordsStore = create<GetCoordsStoreType>((set, get) => ({
    selectedDate: null,
    coordsInfo: {},
    loading: false,
    error: null,

    setSelectedDate: (date) => set({ selectedDate: date }),
    setCoordsInfo: (date, coords) =>
        set((state) => ({
            coordsInfo: { ...state.coordsInfo, [date]: coords },
        })),
    isInfoFetched: (date) => {
        const coordsInfo = get().coordsInfo;
        return !!(coordsInfo[date] === null || Array.isArray(coordsInfo[date]));
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
