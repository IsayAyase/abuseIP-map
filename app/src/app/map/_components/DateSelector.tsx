"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { useGetCoordsStore } from "@/store/clientStore";
import { useSideBarStore } from "@/store/stateStore";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getCoords } from "../_lib/clientApiCalls";

const DateSelector = () => {
    const { expendDateSelector, setExpendDateSelector } = useSideBarStore();

    const [dates, setDates] = useState<
        {
            date: string;
            label: string;
        }[]
    >([]);

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
        <Accordion
            type="single"
            collapsible
            onValueChange={(value) => {
                setExpendDateSelector(value === "dates");
            }}
            value={expendDateSelector ? "dates" : ""}
        >
            <AccordionItem value="dates">
                <AccordionTrigger className="flex-row-reverse py-0">
                    Dates
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                    <ul className="flex flex-col gap-1 text-sm">
                        {dates.map((date) => (
                            <li
                                key={date.date}
                                data-active={selectedDate === date.date}
                                onClick={() => handleDateClick(date.date)}
                                role="button"
                                className="py-1 px-2 border border-transparent rounded-md text-foreground/60 hover:bg-accent/50 hover:border-border hover:text-foreground data-[active=true]:bg-accent data-[active=true]:border-border data-[active=true]:text-foreground transition-colors duration-300 cursor-pointer"
                            >
                                {date.label}
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default DateSelector;
