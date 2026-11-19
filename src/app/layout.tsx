import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SolanaProvider } from "@/components/providers/SolanaProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Locarness — $LCRN",
  description:
    "Locarness: música eletrónica, arte 3D/VFX e o ecossistema $LCRN na rede Solana.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-neutral-100">
        <SolanaProvider>
          <Navbar />
          <main className="relative z-10 flex-1 pt-16">{children}</main>
          <Footer />
        </SolanaProvider>
      </body>
    </html>
  );
}
