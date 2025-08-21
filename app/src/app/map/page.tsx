import BottomNotes from "./_components/BottomNotes";
import HeaderWithMetaInfo from "./_components/HeaderWithMetaInfo";
import MapContainer from "./_components/MapContainer";
import SideBar from "./_components/SideBar";

function Page() {
    return (
        <div className="h-dvh w-full relative">
            <HeaderWithMetaInfo />

            <SideBar />
            <MapContainer />
            <BottomNotes />
        </div>
    );
}

export default Page;
