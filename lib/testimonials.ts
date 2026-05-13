export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Darrel found us a home in The Ridges that was never on the MLS. The whole process took six weeks. We've referred three friends since.",
    name: "Michael & Erin H.",
    role: "Buyers — relocated from Newport Beach",
    location: "The Ridges, Summerlin",
  },
  {
    quote:
      "We interviewed four agents before choosing Darrel. The cinematic video alone got our home in front of buyers the others couldn't reach. Sold in eleven days.",
    name: "Priya R.",
    role: "Seller — Ascaya custom home",
    location: "Ascaya, Henderson",
  },
  {
    quote:
      "Buying from overseas is hard. Darrel handled the closing, the entity setup, and even arranged our move-in concierge. Couldn't recommend more highly.",
    name: "Daniel L.",
    role: "International buyer",
    location: "MacDonald Highlands",
  },
  {
    quote:
      "Discretion mattered to us — Darrel never once put our listing on a public board. Every buyer signed an NDA before walking the property.",
    name: "Anonymous",
    role: "Private seller",
    location: "Lake Las Vegas",
  },
  {
    quote:
      "I've worked with luxury agents in LA and Aspen. Darrel is in that tier and then some. The market intel he sends quarterly is genuinely useful.",
    name: "Carlos M.",
    role: "Repeat client — portfolio",
    location: "Southern Highlands",
  },
];
