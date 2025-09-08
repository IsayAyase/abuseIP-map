import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "mapware | Abusive IP Tracker",
    description:
        "Tracks abusive IP addresses with their locations and shows the data on a 3D map.",
    openGraph: {
        title: "mapware | Abusive IP Tracker",
        description:
            "Tracks abusive IP addresses with their locations and shows the data on a 3D map.",
        url: "https://mapware.prabhatlabs.dev/",
        siteName: "mapware",
        images: [
            {
                url: "https://mapware.prabhatlabs.dev/preview.png",
                width: 1200,
                height: 630,
                alt: "mapware - Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "mapware | Abusive IP Tracker",
        description:
            "Tracks abusive IP addresses with their locations and shows the data on a 3D map.",
        images: ["https://mapware.prabhatlabs.dev/preview.png"],
        creator: "@prabhatsuntoh",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased font-mono font-extralight overflow-x-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    // disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
