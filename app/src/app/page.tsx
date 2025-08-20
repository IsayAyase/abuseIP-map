const Page = async () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="border border-border px-2 py-1 flex flex-col rounded-lg w-fit text-xs">
                <p>
                    <span className="text-muted-foreground">Lat:</span> -25.0000
                </p>
                <p>
                    <span className="text-muted-foreground">Lon:</span> 55.0000
                </p>
            </div>
        </div>
    );
};

export default Page;
