export function progressBar(
    progress: number,
    total: number,
    barWidth: number = 30
): void {
    const percent = Math.floor((progress / total) * 100);
    const filledWidth = Math.floor((percent / 100) * barWidth);
    const emptyWidth = barWidth - filledWidth;

    const progressBar = "█".repeat(filledWidth) + "▒".repeat(emptyWidth);
    process.stdout.write(
        `\r[${progressBar}] ${percent}% (${progress}/${total})`
    );

    if (progress === total) {
        process.stdout.write("\n");
    }
}
