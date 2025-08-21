"use client";
import ThemeBtn from "@/components/ThemeBtn";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSideBarStore } from "@/store/stateStore";
import { ArrowLeft } from "lucide-react";
import DateSelector from "./DateSelector";
import FullIpInfo from "./FullIpInfo";
import MapConfigs from "./MapConfigs";

const SideBar = () => {
    const { expanded, toggle } = useSideBarStore();

    return (
        <div
            data-expanded={expanded}
            className="h-full w-xs fixed top-0 right-0 data-[expanded=false]:translate-x-full z-10 border border-border/50 bg-background/70 backdrop-blur-[4px] transition-transform duration-300 ease-in-out"
        >
            <div className="flex flex-col justify-center p-4 text-right">
                <MapConfigs />
                <Separator className="my-2 bg-muted-foreground/10" />
                <DateSelector />
                <Separator className="my-2 bg-muted-foreground/10" />
                <FullIpInfo />
            </div>

            <div className="absolute top-4 left-0 -translate-x-full flex flex-col gap-2 items-end">
                <Button
                    title="Toggle Sidebar"
                    variant="outline"
                    size="icon"
                    className="rounded-e-none"
                    onClick={() => toggle()}
                >
                    <ArrowLeft
                        data-expanded={expanded}
                        className="data-[expanded=true]:rotate-180 transition-transform duration-300 ease-in-out delay-300"
                    />
                </Button>
                <ThemeBtn className="rounded-e-none" />
            </div>
        </div>
    );
};

export default SideBar;
