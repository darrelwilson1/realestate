import type { LucideIcon } from "lucide-react";
import {
  Home,
  Key,
  Search,
  TrendingUp,
  Camera,
  HandshakeIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "buyer-representation",
    title: "Buyer Representation",
    short: "Off-market access, fierce negotiation, end-to-end discretion.",
    description:
      "We represent qualified buyers across Las Vegas's guard-gated communities — The Ridges, MacDonald Highlands, Ascaya, Lake Las Vegas, Southern Highlands, and Anthem Country Club. Our buyers see properties before they hit the MLS.",
    icon: Key,
    bullets: [
      "Private, off-market listings via direct broker network",
      "Independent property due diligence and inspection coordination",
      "Negotiation on price, terms, and seller concessions",
      "White-glove relocation and closing concierge",
    ],
  },
  {
    slug: "seller-representation",
    title: "Seller Representation",
    short: "Strategic pricing, cinematic marketing, qualified-buyer access.",
    description:
      "Selling a luxury home is part valuation, part storytelling. We position your property with cinematic media, target the right buyer pools, and protect your privacy through every showing.",
    icon: TrendingUp,
    bullets: [
      "Comparative market analysis from recent Las Vegas luxury comps",
      "Cinematic photography, drone, and 4K walkthrough video",
      "Targeted exposure to vetted buyer networks before MLS",
      "Coordinated staging, repairs, and disclosure preparation",
    ],
  },
  {
    slug: "luxury-marketing",
    title: "Luxury Marketing",
    short: "Editorial-grade photography, video, and digital placement.",
    description:
      "Every Darrel's listing receives an editorial-grade media package: twilight photography, drone, 4K cinematic video, and placement across luxury digital channels including The Wall Street Journal, Mansion Global, and JamesEdition.",
    icon: Camera,
    bullets: [
      "Twilight and golden-hour photography",
      "FAA-licensed drone and 4K cinematic video",
      "Custom property microsite per listing",
      "Placement: WSJ, Mansion Global, JamesEdition, Robb Report",
    ],
  },
  {
    slug: "relocation",
    title: "Relocation",
    short: "For executives moving to Las Vegas from CA, NY, or abroad.",
    description:
      "Many of our clients are relocating from California, New York, or internationally. We coordinate the full move — neighborhood tours, school research, tax-counsel introductions, and concierge services.",
    icon: Home,
    bullets: [
      "Private neighborhood tours by helicopter or chauffeur",
      "School, club, and tax-counsel introductions",
      "Coordinated cross-border closings",
      "Concierge handoff for utilities, staff, and security",
    ],
  },
  {
    slug: "investment-acquisition",
    title: "Investment Acquisition",
    short: "Cash-flow and appreciation plays across the Vegas valley.",
    description:
      "From short-term rental portfolios in Summerlin to ground-up new construction in Henderson, we source and underwrite investment opportunities for high-net-worth buyers and family offices.",
    icon: Search,
    bullets: [
      "Off-market acquisition sourcing",
      "Cash-flow underwriting and proforma modeling",
      "1031 exchange coordination",
      "Property-management partner introductions",
    ],
  },
  {
    slug: "private-client",
    title: "Private Client Advisory",
    short: "Ongoing advisory for portfolio holders and repeat clients.",
    description:
      "For clients with multiple properties or ongoing acquisition appetites, Darrel's offers retained advisory — market intelligence, portfolio reviews, and discreet transaction execution.",
    icon: HandshakeIcon,
    bullets: [
      "Quarterly portfolio market-value reviews",
      "Off-market opportunity briefings",
      "NDA-backed transactions and entity structuring",
      "Direct line to Darrel — no team handoffs",
    ],
  },
];
