"use client";

import { useMapPropsStore } from "@/store/stateStore";

const BottomNotes = () => {
    const { zoom } = useMapPropsStore();
    return (
        <div
            data-hide={zoom >= 3}
            className="fixed data-[hide=true]:opacity-0 bottom-0 left-0 my-1 mx-2 text-[10px] transition-opacity duration-300 ease-in-out"
        >
            <p>
                <span className="font-bold">Source:</span>
                Abuse IPDB, IP API, MapBox
            </p>
            <p>
                <span className="font-bold">Note:</span> This map is for
                educational purposes only. The data displayed is based on IP
                geolocation and may not accurately represent the physical
                location of the IP addresses.
            </p>
            <p>
                <span className="font-bold">Disclaimer:</span> The information
                provided here is not intended to be used for any illegal
                activities or to infringe on privacy rights.
            </p>
        </div>
    );
};

export default BottomNotes;
