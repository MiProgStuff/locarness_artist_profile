export const ARTIST_BIO = "movimento · foco · introspeção";

export const ARTIST_EMAIL = "locarness@gmail.com";

// TODO: fazer upload do press kit e preencher este caminho (ex: "/press/locarness_press_kit.zip").
// O ficheiro nunca existiu no site estático anterior — o link lá já estava morto.
export const PRESS_KIT_URL = "";

export const OFFICIAL_VIDEO = {
  youtubeId: "roZAZBLMrD4",
  title: "locarness - tide",
  label: "tide — vídeo oficial",
};

export const SPOTIFY_ARTIST_ID = "6mVK9DvFdYTfCEF4SSyfBB";

export type DiscographyItem = { title: string; tag?: string };

export const DISCOGRAPHY: DiscographyItem[] = [
  { title: "Keep On Motion", tag: "single principal" },
  { title: "God is a Machine" },
  { title: "lights" },
  { title: "Sunwalk" },
  { title: "Comeback" },
  { title: "2802 EP", tag: "2021" },
];

export type ArtistLink = { label: string; href: string };

export const STREAMING_LINKS: ArtistLink[] = [
  { label: "spotify", href: `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}` },
  { label: "apple music", href: "https://music.apple.com/pt/artist/locarness/1499573703" },
  { label: "youtube", href: "https://www.youtube.com/@locarness" },
  { label: "bandcamp", href: "https://locarness.bandcamp.com" },
];

export const ARTIST_SOCIAL_LINKS: ArtistLink[] = [
  { label: "instagram", href: "https://instagram.com/locarness" },
  { label: "tiktok", href: "https://tiktok.com/@locarness" },
  { label: "youtube", href: "https://www.youtube.com/@locarness" },
  { label: "soundcloud", href: "https://soundcloud.com/locarness" },
];
