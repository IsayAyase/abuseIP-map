"use client";

import GetLastUpdatedAt from "@/components/GetLastUpdatedAt";
import LoadingCircle from "@/components/ui/LoadingCircle";
import {
    useGetCoordsStore,
    useGetFullCoordInfoByIdStore,
} from "@/store/clientStore";
import { useMapPropsStore } from "@/store/stateStore";
import { motion } from "framer-motion";

const HeaderWithMetaInfo = ({
    headerTextOnly,
}: {
    headerTextOnly?: boolean;
}) => {
    const { currMouseCoords, zoom } = useMapPropsStore();
    const { loading: coordsLoading } = useGetCoordsStore();
    const { loading: infoLoading } = useGetFullCoordInfoByIdStore();
    return (
        <div className="absolute top-0 left-0 z-10 px-6 py-4 h-full w-full pointer-events-none">
            <div className="relative text-5xl md:text-6xl">
                <motion.h1
                    animate={{
                        opacity: [1, 0.6, 1],
                    }}
                    transition={{
                        ease: "linear",
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                    }}
                    className="text-foreground/90"
                >
                    mapware
                </motion.h1>
                <div>
                    <motion.h1
                        initial={{ x: 0 }}
                        animate={{
                            x: [0, -4, 4, 0],
                        }}
                        transition={{
                            ease: "linear",
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                        className="absolute -z-10 top-0 left-0 text-red-500/65"
                    >
                        mapware
                    </motion.h1>
                    <motion.h1
                        initial={{ y: 0 }}
                        animate={{
                            y: [0, -4, 4, 0],
                        }}
                        transition={{
                            ease: "linear",
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                        className="absolute -z-10 top-0 left-0 text-blue-500/65"
                    >
                        mapware
                    </motion.h1>
                    <motion.h1
                        initial={{ x: 0, y: 0 }}
                        animate={{
                            x: [0, -4, 4, 0],
                            y: [0, -4, 4, 0],
                        }}
                        transition={{
                            ease: "linear",
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                        className="absolute -z-10 top-0 left-0 text-green-500/45"
                    >
                        mapware
                    </motion.h1>
                </div>
            </div>

            <GetLastUpdatedAt />
            {!headerTextOnly && (
                <>
                    <div className="flex flex-col md:flex-row md:items-center gap-0.5 text-xs">
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
                                {coordsLoading && (
                                    <span>loading coordinates...</span>
                                )}
                                {infoLoading && <span>loading info...</span>}
                            </div>
                        )}
                    </div>
                    <div
                        className="absolute inset-0 -z-20"
                        style={{
                            backgroundImage:
                                "radial-gradient(ellipse 600px 200px at 0% 0%, color-mix(in oklab, var(--background) 60%, transparent) 50%, transparent)",
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default HeaderWithMetaInfo;
// rgb(254, 154, 0, 0.5)
