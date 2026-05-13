export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  location: string;
  // Tailwind grid-span classes; lets a few images go large for visual rhythm.
  span?: "wide" | "tall" | "large";
};

/*
  Using Unsplash hotlinks as placeholders for luxury home photography.
  Swap with real listing imagery served from /public or a CDN before launch.
  Domains are whitelisted in next.config.ts.
*/
export const gallery: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern desert estate with floor-to-ceiling glass and a negative-edge pool overlooking the Las Vegas valley",
    width: 1600,
    height: 1067,
    title: "Sky-Vault Estate",
    location: "The Ridges, Summerlin",
    span: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    alt: "Contemporary white kitchen with marble waterfall island",
    width: 1200,
    height: 800,
    title: "The Marble Kitchen",
    location: "Ascaya, Henderson",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Two-story custom desert home at twilight with warm interior glow",
    width: 1200,
    height: 800,
    title: "Twilight at MacDonald Highlands",
    location: "MacDonald Highlands",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    alt: "Sunken living room with linear fireplace and panoramic strip views",
    width: 1200,
    height: 800,
    title: "Strip-View Lounge",
    location: "Queensridge",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    alt: "Resort-style backyard with infinity pool, cabana, and outdoor kitchen",
    width: 1200,
    height: 800,
    title: "Resort Backyard",
    location: "Lake Las Vegas",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    alt: "Primary bedroom with low-profile bed and floor-to-ceiling windows",
    width: 1200,
    height: 800,
    title: "Primary Suite",
    location: "Southern Highlands",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    alt: "Glass-walled wine cellar with backlit display racks",
    width: 1200,
    height: 800,
    title: "Cellar at 1500 Bottles",
    location: "Anthem Country Club",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1200&q=80",
    alt: "Mid-century inspired exterior with cantilevered roof and stacked-stone walls",
    width: 1200,
    height: 800,
    title: "Cantilever House",
    location: "Spanish Trail",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    alt: "Elegant home exterior at dusk with manicured landscaping",
    width: 1600,
    height: 1067,
    title: "The Walnut Estate",
    location: "Tournament Hills",
    span: "wide",
  },
];
