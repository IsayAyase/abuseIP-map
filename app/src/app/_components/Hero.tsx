"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionLayout from "./SectionLayout";

const Hero = () => {
    return (
        <div className="pt-40">
            <SectionLayout className="flex-col">
                <div className="flex flex-col items-center gap-4 mb-60">
                    <h1 className="text-8xl text-center">
                        Global Abusive IP Map
                    </h1>

                    <h4 className="text-3xl text-center">
                        Track abusive IP activity across the world!
                    </h4>
                </div>

                {/* <Link
                    href="/map"
                    className="relative flex items-center cursor-pointer hover:scale-105 transition-transform duration-300 bg-foreground/0 px-2 py-1"
                >
                    <span className="absolute h-full w-full top-0 left-0 overflow-hidden pointer-events-none">
                        <motion.span
                            initial={{ y: -100, x: -100 }}
                            animate={{ x: [-100, 100] }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                            className="bg-foreground/30 h-60 w-4 inline-block rotate-45"
                        />
                        <motion.span
                            initial={{ y: -100, x: -100 }}
                            animate={{ x: [-100, 100] }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                            className="bg-foreground/40 h-60 w-4 inline-block rotate-45"
                        />
                    </span>
                    <span>{"view the map"}</span>
                </Link> */}

                <div className="relative text-xl font-semibold">
                    <Link href="/map">
                        <span className="absolute h-full w-full top-0 left-0 overflow-hidden pointer-events-none">
                            <motion.span
                                initial={{ y: -100, x: -100 }}
                                animate={{ x: [-100, 100] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                }}
                                className="bg-foreground/30 h-60 w-4 inline-block rotate-45"
                            />
                            <motion.span
                                initial={{ y: -100, x: -100 }}
                                animate={{ x: [-100, 100] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                }}
                                className="bg-foreground/40 h-60 w-4 inline-block rotate-45"
                            />
                        </span>
                        <motion.span
                            animate={{
                                opacity: [1, 0.6, 1],
                            }}
                            transition={{
                                ease: "linear",
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                            className="text-foreground/90 px-2 py-1"
                        >
                            view the map
                        </motion.span>
                    </Link>
                    <div>
                        <motion.span
                            initial={{ x: 0 }}
                            animate={{
                                x: [0, -2, 2, 0],
                            }}
                            transition={{
                                ease: "linear",
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                            className="absolute -z-10 top-0 left-0 text-red-500/65 px-2"
                        >
                            view the map
                        </motion.span>
                        <motion.span
                            initial={{ y: 0 }}
                            animate={{
                                y: [0, -2, 2, 0],
                            }}
                            transition={{
                                ease: "linear",
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                            className="absolute -z-10 top-0 left-0 text-blue-500/65 px-2"
                        >
                            view the map
                        </motion.span>
                        <motion.span
                            initial={{ x: 0, y: 0 }}
                            animate={{
                                x: [0, -2, 2, 0],
                                y: [0, -2, 2, 0],
                            }}
                            transition={{
                                ease: "linear",
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                            className="absolute -z-10 top-0 left-0 text-green-500/45 px-2"
                        >
                            view the map
                        </motion.span>
                    </div>
                </div>
            </SectionLayout>
        </div>
    );
};

export default Hero;
