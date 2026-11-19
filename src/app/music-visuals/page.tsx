import { Download, Mail } from "lucide-react";
import {
  ARTIST_BIO,
  ARTIST_EMAIL,
  ARTIST_SOCIAL_LINKS,
  DISCOGRAPHY,
  OFFICIAL_VIDEO,
  PRESS_KIT_URL,
  SPOTIFY_ARTIST_ID,
  STREAMING_LINKS,
} from "@/data/artist";

function PillLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs lowercase tracking-wide text-neutral-300 transition-colors hover:border-emerald-400/40 hover:text-white"
    >
      {label}
    </a>
  );
}

export default function MusicVisualsPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-20">
      {/* Intro */}
      <section className="flex flex-col gap-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
          Música &amp; Visuais
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          Ritmo, textura, espaço
        </h1>
        <p className="mx-auto max-w-xl text-sm text-neutral-400 sm:text-base">
          {ARTIST_BIO}
        </p>
      </section>

      {/* Vídeo oficial */}
      <section className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          {OFFICIAL_VIDEO.label}
        </p>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${OFFICIAL_VIDEO.youtubeId}`}
              title={OFFICIAL_VIDEO.title}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <div className="grid gap-10 sm:grid-cols-2">
        {/* Discografia */}
        <section className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Discografia
          </p>
          <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {DISCOGRAPHY.map((item, index) => (
              <li
                key={item.title}
                className="flex items-center gap-3 py-3 text-sm text-neutral-200"
              >
                <span
                  className={`h-2 w-2 flex-shrink-0 rotate-45 ${
                    index % 2 === 0 ? "bg-cyan-400" : "bg-emerald-400"
                  }`}
                />
                {item.title}
                {item.tag && (
                  <span className="ml-auto font-mono text-xs lowercase text-neutral-500">
                    {item.tag}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Player Spotify */}
        <section className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Ouve agora
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <iframe
              src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator`}
              width="100%"
              height="352"
              className="border-0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </section>
      </div>

      {/* Plataformas */}
      <section className="flex flex-col items-center gap-3 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          Ouve em todo o lado
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {STREAMING_LINKS.map((link) => (
            <PillLink key={link.label} {...link} />
          ))}
        </div>
      </section>

      {/* Imprensa & contacto */}
      <section className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          Imprensa &amp; contacto
        </p>

        {PRESS_KIT_URL ? (
          <a
            href={PRESS_KIT_URL}
            download
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            <Download size={15} /> Download Press Kit
          </a>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm text-neutral-500">
            <Download size={15} /> Press kit brevemente
          </span>
        )}

        <a
          href={`mailto:${ARTIST_EMAIL}`}
          className="flex items-center gap-2 font-mono text-sm text-neutral-300 transition-colors hover:text-emerald-400"
        >
          <Mail size={14} />
          {ARTIST_EMAIL}
        </a>

        <div className="flex flex-wrap justify-center gap-3">
          {ARTIST_SOCIAL_LINKS.map((link) => (
            <PillLink key={link.label} {...link} />
          ))}
        </div>
      </section>
    </div>
  );
}
