"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

function ThemeBtn({ className }: { className?: string }) {
    const {
        setTheme,
        themes: [LIGHT, DARK, SYSTEM],
        systemTheme,
    } = useTheme();

    const toggle = () => {
        setTheme((p) => {
            return p === SYSTEM
                ? systemTheme === DARK
                    ? LIGHT
                    : DARK
                : p === DARK
                ? LIGHT
                : DARK;
        });
    };

    useEffect(() => {
        const handleEvent = (e: KeyboardEvent) => {
            if (e.key === "." && (e.metaKey || e.ctrlKey)) {
                toggle();
            }
        };

        addEventListener("keydown", handleEvent);

        return () => {
            removeEventListener("keydown", handleEvent);
        };
    }, [toggle, systemTheme, setTheme]);

    return (
        <Button
            title="Toggle theme"
            variant="secondary"
            size="icon"
            onClick={toggle}
            className={className}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

export default ThemeBtn;
