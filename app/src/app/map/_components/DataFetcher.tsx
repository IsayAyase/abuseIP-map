"use client";

import { useGetCoordsStore } from "@/store/clientStore";
import { useEffect } from "react";
import { getCoords } from "../_lib/clientApiCalls";

const DataFetcher = () => {
    const {
        loading,
        coordsInfo,
        setCoordsInfo,
        isInfoFetched,
        setError,
        setLoading,
    } = useGetCoordsStore();

    // Fetch coordinates when selectedDate changes
    useEffect(() => {
        if (loading || isInfoFetched()) {
            return;
        }

        const handleCoordsFetch = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await getCoords();
                if (res.length > 0) {
                    setCoordsInfo(res);
                } else {
                    setCoordsInfo(null);
                    setError("No coordinates found for the selected date.");
                }
            } catch (error: any) {
                console.error("Error fetching coordinates:", error);
                setCoordsInfo(null);
                setError(error.message || "Failed to fetch coordinates.");
            }
            setLoading(false);
        };

        handleCoordsFetch();
    }, [loading, coordsInfo, isInfoFetched]);

    return (
        <div className="text-sm mx-4">
            {coordsInfo ? (
                <p>
                    Showing{" "}
                    <span className="font-bold">{coordsInfo.length}</span>{" "}
                    abusive ip reports with geo-location for last 24hrs!
                </p>
            ) : (
                <p>No coordinates found for the last 24hrs.</p>
            )}
        </div>
    );
};

export default DataFetcher;
