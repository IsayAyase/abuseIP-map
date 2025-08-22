"use client";
import ThemeBtn from "@/components/ThemeBtn";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSideBarStore } from "@/store/stateStore";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import BottomNotes from "./BottomNotes";
import DataFetcher from "./DataFetcher";
import FullIpInfo from "./FullIpInfo";
import { MapDataVisConfigs, MapGlobeConfigs } from "./MapConfigs";

const SideBar = () => {
    const { expanded, toggle, setExpanded } = useSideBarStore();

    useEffect(() => {
        const handleEvent = (e: KeyboardEvent) => {
            if (e.key === "Escape" && expanded) {
                setExpanded(false);
            }
        };

        addEventListener("keydown", handleEvent);

        return () => {
            removeEventListener("keydown", handleEvent);
        };
    }, [setExpanded, expanded]);

    return (
        <div
            data-expanded={expanded}
            className="h-full w-xs fixed top-0 right-0 data-[expanded=false]:translate-x-full z-10 border border-border bg-background/70 backdrop-blur-[4px] transition-transform duration-300 ease-in-out"
        >
            <div className="flex flex-col justify-center py-4">
                <h3 className="text-2xl font-normal mx-4">Configs</h3>
                <Separator className="my-2 bg-border" />
                <MapDataVisConfigs />
                <Separator className="my-2 bg-border" />
                <MapGlobeConfigs />
                <Separator className="my-2 bg-border" />
                <DataFetcher />
                <Separator className="my-2 bg-border" />
                <FullIpInfo />
            </div>

            <div className="absolute bottom-0 left-0 w-full">
                <BottomNotes />
            </div>

            <div className="absolute top-4 left-0 -translate-x-full flex flex-col gap-2 items-end">
                <Button
                    title="Toggle Sidebar"
                    variant="secondary"
                    size="icon"
                    className="rounded-e-none bg-background border border-border"
                    onClick={() => toggle()}
                >
                    <ArrowLeft
                        data-expanded={expanded}
                        className="data-[expanded=true]:rotate-180 transition-transform duration-300 ease-in-out delay-300"
                    />
                </Button>
                <ThemeBtn className="rounded-e-none bg-background border border-border" />
            </div>
        </div>
    );
};

export default SideBar;
