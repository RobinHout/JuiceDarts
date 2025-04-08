import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Juice Darts App",
    description: "Voor de Juicebar",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
