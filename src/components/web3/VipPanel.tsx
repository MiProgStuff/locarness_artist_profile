import { Download, MessageCircleHeart, Music } from "lucide-react";
import { VIP_INVITE_URL } from "@/config/token";

export function VipPanel() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <Music size={18} className="text-emerald-400" />
        <h3 className="text-sm font-semibold text-white">Faixa Inédita</h3>
        <p className="text-xs text-neutral-400">Demo exclusiva para holders.</p>
        <audio controls className="mt-2 w-full" src="/vip/demo-track.mp3" />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <Download size={18} className="text-emerald-400" />
        <h3 className="text-sm font-semibold text-white">Arte 3D &amp; Wallpapers</h3>
        <p className="text-xs text-neutral-400">
          Pack em alta resolução, só para a comunidade $LCRN.
        </p>
        <a
          href="/vip/wallpapers-pack.zip"
          download
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-200 transition-colors hover:border-emerald-400/40 hover:text-white"
        >
          <Download size={14} /> Descarregar Pack
        </a>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <MessageCircleHeart size={18} className="text-emerald-400" />
        <h3 className="text-sm font-semibold text-white">Comunidade Privada</h3>
        <p className="text-xs text-neutral-400">
          Canal exclusivo para holders discutirem os próximos lançamentos.
        </p>
        {VIP_INVITE_URL ? (
          <a
            href={VIP_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90"
          >
            Entrar no Canal Privado
          </a>
        ) : (
          <span className="mt-2 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-medium text-neutral-500">
            Convite brevemente
          </span>
        )}
      </div>
    </div>
  );
}
