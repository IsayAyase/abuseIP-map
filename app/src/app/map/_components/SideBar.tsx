"use client";
import ThemeBtn from "@/components/ThemeBtn";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useGetCoordsStore } from "@/store/clientStore";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getCoords } from "../_lib/clientApiCalls";
import FullIpInfo from "./FullIpInfo";

const SideBar = () => {
    const [dates, setDates] = useState<
        {
            date: string;
            label: string;
        }[]
    >([]);

    const [expanded, setExpanded] = useState<boolean>(false);

    const {
        selectedDate,
        loading,
        coordsInfo,
        isInfoFetched,
        setCoordsInfo,
        setError,
        setLoading,
        setSelectedDate,
    } = useGetCoordsStore();

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
    };

    // Initialize dates for the last 7 days
    useEffect(() => {
        const d = [];
        for (let i = 0; i < 10; i++) {
            const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
            d.push({
                date: dayjs(date).format("YYYY-MM-DD"),
                label:
                    (i === 0 ? " (today)" : "") +
                    dayjs(date).format("ddd, MMMM D"),
            });
        }
        setSelectedDate(d[0].date);
        setDates(d);
    }, []);

    // Fetch coordinates when selectedDate changes
    useEffect(() => {
        if (!selectedDate || loading || isInfoFetched(selectedDate)) {
            return;
        }

        const handleCoordsFetch = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await getCoords(selectedDate);
                if (res.length > 0) {
                    setCoordsInfo(selectedDate, res);
                } else {
                    setCoordsInfo(selectedDate, null);
                    setError("No coordinates found for the selected date.");
                }
            } catch (error: any) {
                console.error("Error fetching coordinates:", error);
                setCoordsInfo(selectedDate, null);
                setError(error.message || "Failed to fetch coordinates.");
            }
            setLoading(false);
        };

        handleCoordsFetch();
    }, [
        selectedDate,
        loading,
        coordsInfo,
        isInfoFetched,
        setLoading,
        setError,
        setCoordsInfo,
    ]);

    return (
        <div
            data-expanded={expanded}
            className="h-full w-xs fixed top-0 right-0 data-[expanded=false]:translate-x-full z-10 border border-border/50 bg-background/70 backdrop-blur-[4px] transition-transform duration-300 ease-in-out"
        >
            <div className="flex flex-col justify-center gap-2 p-4 text-right">
                <Accordion type="single" collapsible defaultValue="dates">
                    <AccordionItem value="dates">
                        <AccordionTrigger className="flex-row-reverse">
                            Dates
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="flex flex-col gap-1 text-sm">
                                {dates.map((date) => (
                                    <li
                                        key={date.date}
                                        data-active={selectedDate === date.date}
                                        onClick={() =>
                                            handleDateClick(date.date)
                                        }
                                        role="button"
                                        className="py-1 px-2 border border-transparent rounded-md text-muted-foreground hover:bg-accent/50 hover:border-border hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:border-border data-[active=true]:text-accent-foreground transition-colors duration-300"
                                    >
                                        {date.label}
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <FullIpInfo />
            </div>

            <div className="absolute top-4 left-0 -translate-x-full flex flex-col gap-2 items-end">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-e-none"
                    onClick={() => setExpanded((p) => !p)}
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
