export type TeamMember = {
  name: string;
  pirateRole: string;
  normalRole: string;
  social: {
    discord?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  specialization?: string;
  colorScheme: string;
};

export const crewMembers: TeamMember[] = [
  {
    name: "Cooper de Nicola",
    pirateRole: "Captain Silly Beard the Organizer",
    normalRole: "Team Organizer & Multi-Year Competitor",
    social: { discord: "cooper7840", github: "cdenicola" },
    specialization: "Multi-year veteran organizer",
    colorScheme: "bg-red-500/20 text-red-300 border-red-400/40"
  },
  {
    name: "Roberto Lama",
    pirateRole: "Admiral Ridiculous of the Silly Seas",
    normalRole: "Team Organizer & Multi-Year Competitor", 
    social: { discord: "rlama__", github: "roberto-lama" },
    specialization: "Multi-year veteran organizer",
    colorScheme: "bg-orange-500/20 text-orange-300 border-orange-400/40"
  },
  {
    name: "George Hosono",
    pirateRole: "Commodore Goofy of the Giggling Fleet",
    normalRole: "Team Organizer & Multi-Year Competitor",
    social: { discord: "george_hosono", github: "george-hosono" },
    specialization: "Multi-year veteran organizer", 
    colorScheme: "bg-amber-500/20 text-amber-300 border-amber-400/40"
  },
  {
    name: "Jack Cable",
    pirateRole: "The Jester Admiral of Jolly Waters",
    normalRole: "Multi-Year Competitor",
    social: { discord: "jack_cable", github: "jackcable" },
    specialization: "Multi-year veteran competitor",
    colorScheme: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40"
  },
  {
    name: "Glen Husman", 
    pirateRole: "Master of the Azure Treasures",
    normalRole: "Blue Gold Specialist",
    social: { discord: "glen_husman", github: "glen-husman" },
    specialization: "Blue Gold puzzle expert",
    colorScheme: "bg-blue-500/20 text-blue-300 border-blue-400/40"
  },
  {
    name: "Agus Covarrubias",
    pirateRole: "Keeper of the Golden Doubloons", 
    normalRole: "Coin Puzzle Specialist",
    social: { discord: "agus_covarrubias", github: "agus-covarrubias" },
    specialization: "Coin puzzle master",
    colorScheme: "bg-green-500/20 text-green-300 border-green-400/40"
  },
  {
    name: "Liam Fay",
    pirateRole: "His Most Magnificent Remote Admiral of the Seven Digital Seas",
    normalRole: "Remote Cryptography Expert",
    social: { discord: "liam_fay", github: "liam-fay" },
    specialization: "Remote contributor with grand impact",
    colorScheme: "bg-teal-500/20 text-teal-300 border-teal-400/40"
  },
  {
    name: "Yasmine Mitchell",
    pirateRole: "Guardian of the Sacred Manifests",
    normalRole: "Manifest Puzzle Specialist", 
    social: { discord: "yasmine_mitchell", github: "yasmine-mitchell" },
    specialization: "Manifest puzzle expert",
    colorScheme: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
  },
  {
    name: "Ashley Dai",
    pirateRole: "Rising Star of the Cryptographic Horizon",
    normalRole: "First-Year High-Impact Contributor",
    social: { discord: "ashley_dai", github: "ashley-dai" },
    specialization: "First-year member with exceptional impact",
    colorScheme: "bg-sky-500/20 text-sky-300 border-sky-400/40"
  },
  {
    name: "Keely Podosin", 
    pirateRole: "Brilliant Navigator of Uncharted Codes",
    normalRole: "First-Year High-Impact Contributor",
    social: { discord: "keely_podosin", github: "keely-podosin" },
    specialization: "First-year member with exceptional impact",
    colorScheme: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40"
  },
  {
    name: "Seyma Kilic",
    pirateRole: "Fearless Decoder of Ancient Mysteries", 
    normalRole: "First-Year High-Impact Contributor",
    social: { discord: "seyma_kilic", github: "seyma-kilic" },
    specialization: "First-year member with exceptional impact",
    colorScheme: "bg-violet-500/20 text-violet-300 border-violet-400/40"
  },
  {
    name: "Teddy Zhang",
    pirateRole: "Valiant Cipher-Breaker of the New Generation",
    normalRole: "First-Year High-Impact Contributor", 
    social: { discord: "teddy_zhang", github: "teddy-zhang" },
    specialization: "First-year member with exceptional impact",
    colorScheme: "bg-purple-500/20 text-purple-300 border-purple-400/40"
  }
];
