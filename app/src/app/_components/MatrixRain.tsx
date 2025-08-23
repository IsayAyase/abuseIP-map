"use client";

import { color } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

type MatrixRainProps = {
    /** Canvas fills its parent; control height via parent styles */
    fontSize?: number; // px per glyph (default 16)
    fade?: number; // 0–1 trail strength (default 0.08)
    backgroundAlpha?: number; // 0–1, how quickly trails fade (default 0.08)
    charset?: string; // characters used in the rain
    charCount?: number; // total number of glyphs (default 50)
};

const RED_COLOR = "rgba(255, 0, 0, 0.5)";
const GREEN_COLOR = "rgba(0, 255, 0, 0.5)";

export default function MatrixRain({
    fontSize = 16,
    fade = 0.08,
    backgroundAlpha = 0.1,
    charset = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    charCount = 50,
}: MatrixRainProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);

    const {
        theme,
        systemTheme,
        themes: [, DARK, SYSTEM],
    } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let running = true;

        // Handle high-DPI + resize
        const resize = () => {
            const dpr = Math.max(1, window.devicePixelRatio || 1);
            const { clientWidth, clientHeight } =
                canvas.parentElement || canvas;
            canvas.width = Math.floor(clientWidth * dpr);
            canvas.height = Math.floor(clientHeight * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale drawing to CSS pixels
            ctx.font = `${fontSize}px monospace`;
        };

        resize();
        window.addEventListener("resize", resize);

        // Columns & drops
        const getCols = () =>
            Math.ceil(canvas.width / (window.devicePixelRatio || 1) / fontSize);
        const getRows = () =>
            Math.ceil(
                canvas.height / (window.devicePixelRatio || 1) / fontSize
            );
        const columns = getCols();
        const rows = getRows();

        const draw = () => {
            if (!running) return;

            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);

            // Fade the entire canvas slightly to create the trail
            const bgColor =
                theme === SYSTEM
                    ? systemTheme === DARK
                        ? `rgba(0, 0, 0, ${backgroundAlpha})`
                        : `rgba(255, 255, 255, ${backgroundAlpha})`
                    : theme === DARK
                    ? `rgba(0, 0, 0, ${backgroundAlpha})`
                    : `rgba(255, 255, 255, ${backgroundAlpha})`;
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, w, h);

            for (let j = 0; j < charCount; j++) {
                const randX = Math.floor(Math.random() * columns) * fontSize;
                const randY = Math.floor(Math.random() * rows) * fontSize;
                const char = charset.charAt(
                    Math.floor(Math.random() * charset.length)
                );
                const color = randX > w / 2 ? RED_COLOR : GREEN_COLOR;
                ctx.fillStyle = color;
                ctx.fillText(char, randX, randY);
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        const resizeObserver = new ResizeObserver(() => {
            resize();
        });
        resizeObserver.observe(canvas.parentElement || canvas);

        // start
        rafRef.current = requestAnimationFrame(draw);

        return () => {
            running = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            resizeObserver.disconnect();
            window.removeEventListener("resize", resize);
        };
    }, [
        fontSize,
        fade,
        color,
        backgroundAlpha,
        charset,
        charCount,
        theme,
        systemTheme,
    ]);

    return (
        <div className="absolute -z-10 w-full h-full">
            <canvas
                ref={canvasRef}
                className="absolute -z-10 inset-0 w-full h-full block"
            />
        </div>
    );
}
