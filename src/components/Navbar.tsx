"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

type NavLink = { href: string; label: string; highlight?: boolean };

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Universo" },
  { href: "/music-visuals", label: "Música & Visuais" },
  { href: "/lcrn", label: "Ecossistema $LCRN", highlight: true },
  { href: "/vault", label: "The Vault" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-[0.2em] text-white"
        >
          LOCARNESS
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-white"
              >
                {link.label}
                {link.highlight && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="wallet-button-wrap">
          <WalletMultiButtonDynamic />
        </div>
      </nav>
    </header>
  );
}
