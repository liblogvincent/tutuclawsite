import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TutuClaw - AI News Platform",
  description: "TutuClaw — Latest AI industry updates, tech breakthroughs, and analysis",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 relative">
          {/* Ambient glow blobs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div
              className="glow-blob w-[500px] h-[500px] -top-48 -right-48"
              style={{ background: "var(--accent-start)" }}
            />
            <div
              className="glow-blob w-[400px] h-[400px] top-1/3 -left-32"
              style={{
                background: "var(--accent-end)",
                animationDelay: "-4s",
              }}
            />
            <div
              className="glow-blob w-[300px] h-[300px] bottom-20 right-1/4"
              style={{
                background: "var(--accent-mid)",
                animationDelay: "-8s",
              }}
            />
          </div>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
