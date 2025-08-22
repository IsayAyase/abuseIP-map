"use client";

const BottomNotes = () => {
    return (
        <div className="fixed data-[hide=true]:opacity-0 bottom-0 left-0 my-1 mx-2 text-[10px] transition-opacity duration-300 ease-in-out">
            <p>
                <span className="font-bold">Source: </span>
                Abuse IPDB, IP API, MapTiler, OpenStreetMap
            </p>
            <p className="text-[9px]">
                <span className="font-bold">Note:</span> The data is updated
                every 6 hours, with a 1-hour delay for a full update.
            </p>
            <p className="text-[9px]">
                <span className="font-bold">Disclaimer:</span> Educational
                purposes only. Data may not reflect physical location. Not
                intended for illegal activities or privacy infringement.
            </p>
        </div>
    );
};

export default BottomNotes;
