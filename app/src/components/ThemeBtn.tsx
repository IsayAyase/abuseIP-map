"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function ThemeBtn({ className }: { className?: string }) {
    const { setTheme, themes, theme } = useTheme();

    const toggle = () =>
        setTheme((p) => {
            return p === "light" ? "dark" : "light";
        });

    useEffect(() => {
        const handleEvent = (e: KeyboardEvent) => {
            console.log("shit");
            if (e.key === "." && (e.metaKey || e.ctrlKey)) {
                console.log("shit shit");
                toggle();
            }
        };

        addEventListener("keydown", handleEvent);

        return () => {
            removeEventListener("keydown", handleEvent);
        };
    }, []);

    return (
        <Button
            variant="outline"
            size="icon"
            onToggle={toggle}
            className={className}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

export default ThemeBtn;
