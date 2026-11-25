"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";

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
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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

        <div className="flex items-center gap-3">
          <div className="wallet-button-wrap">
            <WalletMultiButtonDynamic />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-200 transition-colors hover:border-emerald-400/40 hover:text-white md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed right-4 top-20 z-50 w-56 origin-top-right rounded-2xl border border-white/10 bg-black/90 p-2 shadow-xl backdrop-blur-md transition-all duration-150 md:hidden ${
          mobileOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-neutral-300 hover:bg-white/5 hover:text-white"
                  }`}
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
            );
          })}
        </ul>
      </div>
    </header>
  );
}
