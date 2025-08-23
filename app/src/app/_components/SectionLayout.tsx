const SectionLayout = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`h-full w-full max-w-7xl mx-auto px-6 py-4 relative flex items-center justify-center gap-4 ${className}`}
        >
            {children}
        </div>
    );
};

export default SectionLayout;
