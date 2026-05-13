/**
 * Single source of truth for business identity, NAP (name/address/phone),
 * social links, and primary nav. Imported by Footer, Navbar, JSON-LD, and Metadata.
 */
export const site = {
  name: "Darrel's Real Estate",
  shortName: "Darrel's",
  tagline: "Las Vegas luxury homes, sold with discretion.",
  description:
    "Boutique luxury real estate in Las Vegas. Darrel's Real Estate represents buyers and sellers in The Ridges, MacDonald Highlands, Ascaya, Lake Las Vegas, and the Vegas valley's premier guard-gated communities.",
  url: "https://darrelsrealestate.com",
  ogImage: "/og.png",
  locale: "en_US",
  // NAP — used in Footer, Contact page, and LocalBusiness JSON-LD.
  // Replace with real details before launch.
  nap: {
    name: "Darrel's Real Estate",
    street: "9205 W Russell Rd, Suite 240",
    city: "Las Vegas",
    region: "NV",
    postalCode: "89148",
    country: "US",
    phone: "+1-702-555-0188",
    phoneDisplay: "(702) 555-0188",
    email: "hello@darrelsrealestate.com",
    // Approximate downtown-adjacent coords; adjust to real office.
    latitude: 36.123,
    longitude: -115.295,
  },
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "10:00 AM – 5:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  social: {
    instagram: "https://instagram.com/darrelsrealestate",
    facebook: "https://facebook.com/darrelsrealestate",
    linkedin: "https://linkedin.com/company/darrels-real-estate",
    youtube: "https://youtube.com/@darrelsrealestate",
  },
  // License — Nevada Real Estate Division requires display on marketing material.
  license: "NV BS.0190234",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;
