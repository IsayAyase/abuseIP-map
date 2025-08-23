const Footer = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full p-4" id="footer">
            <div className="absolute -z-0 bottom-0 left-0 w-full h-40">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(180deg, 
                                    transparent 0%, 
                                    transparent 25%, 
                                    color-mix(in oklab, var(--background) 40%, transparent) 45%, 
                                    color-mix(in oklab, var(--background) 45%, transparent) 50%, 
                                    color-mix(in oklab, var(--background) 60%, transparent) 70%, 
                                    color-mix(in oklab, var(--background) 65%, transparent) 85%, 
                                    color-mix(in oklab, var(--background) 75%, transparent) 100%
                                )`,
                        backdropFilter: `blur(0px)`,
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(180deg, 
                    transparent 0%, 
                                    color-mix(in oklab, var(--background) 20%, transparent) 60%, 
                                    color-mix(in oklab, var(--background) 30%, transparent) 70%, 
                                    color-mix(in oklab, var(--background) 40%, transparent) 80%, 
                                    color-mix(in oklab, var(--background) 50%, transparent) 90%, 
                                    color-mix(in oklab, var(--background) 60%, transparent) 100%
                                )`,
                        backdropFilter: `blur(8px)`,
                        maskImage: `linear-gradient(180deg, 
                                    transparent 0%, 
                                    transparent 10%, 
                                    color-mix(in oklab, var(--foreground) 20%, transparent) 55%, 
                                    color-mix(in oklab, var(--foreground) 30%, transparent) 65%, 
                                    color-mix(in oklab, var(--foreground) 50%, transparent) 75%, 
                                    color-mix(in oklab, var(--foreground) 70%, transparent) 85%, 
                                    color-mix(in oklab, var(--foreground) 100%, transparent) 100%
                                )`,
                    }}
                />
            </div>
            <div className="max-w-7xl mx-auto flex flex-col gap-8 items-center">
                <h1 className="text-5xl md:text-7xl text-muted-foreground mb-10">
                    mapware
                </h1>
            </div>
            <div className="absolute bottom-0 left-0 z-20 text-xs w-full my-1 flex flex-col items-center md:flex-row md:justify-center gap-1">
                <span>
                    {"Build by"}{" "}
                    <a
                        href="https://x.com/prabhatsuntoh"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        prabhatsuntoh
                    </a>
                    {" • Check out the public github "}
                    <a
                        href="https://github.com/prabhatm8000/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        here
                    </a>
                </span>
                <span>{` • mapware.com © ${new Date().getFullYear()}. All rights reserved.`}</span>
            </div>
        </div>
    );
};

export default Footer;
