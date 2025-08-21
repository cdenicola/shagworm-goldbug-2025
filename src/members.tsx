export type TCrewMember = {
  name: string
  links?: TSocialLink[]
}

export type TSocialLink = {
  link: string
  icon: keyof typeof LucideIcons
  label?: string
}

// base factory
const makeLinkIcon =
  (icon: IconName) =>
  (link: string, label?: string): TSocialLink => ({ link, icon, label })

// convenience helpers (use react names of lucide icons)
export const LinkedIn = makeLinkIcon("Linkedin") // lucide icon name is "Linkedin"
export const Github = makeLinkIcon("Github")
//export const Twitter  = makeLinkIcon("Twitter");
//export const Instagram= makeLinkIcon("Instagram");
export const Website = makeLinkIcon("Globe")
export const Terminal = makeLinkIcon("SquareTerminal")
export const Security = makeLinkIcon("LockKeyhole")

export const crewMembers: TCrewMember[] = [
  {
    name: "Cooper de Nicola",
    links: [
      LinkedIn("https://www.linkedin.com/in/cooperdenicola"),
      Github("https://github.com/cdenicola"),
    ],
  },
  {
    name: "Roberto Lama",
    links: [
      LinkedIn("https://www.linkedin.com/in/robertolama/"),
      {
        link: "https://www.endur.earth/",
        icon: "Earth",
        label: "Endur Website",
      },
    ],
  },
  {
    name: "George Hosono",
    links: [Terminal("https://h4ck.dev/about/")],
  },
  {
    name: "Jack Cable",
    links: [
      LinkedIn("https://www.linkedin.com/in/jackcable"),
      Security("https://corridor.dev/"),
    ],
  },
  {
    name: "Ashley Dai",
    links: [LinkedIn("https://www.linkedin.com/in/ashley-dai-173648204")],
  },
  {
    name: "Keely Podosin",
    links: [LinkedIn("https://www.linkedin.com/in/keely-podosin")],
  },
  {
    name: "Seyma Kilic",
    links: [LinkedIn("https://www.linkedin.com/in/seyma-kilic")],
  },
  {
    name: "Teddy Zhang",
    links: [LinkedIn("https://www.linkedin.com/in/teddyzhng")],
  },
  {
    name: "Liam Fay",
    links: [LinkedIn("https://www.linkedin.com/in/liamjfay")],
  },
  {
    name: "Agus Covarrubias",
    links: [Website("https://agucova.dev/")],
  },
  {
    name: "Yasmine Mitchell",
    links: [LinkedIn("https://www.linkedin.com/in/ymitchellcs/")],
  },
  {
    name: "Glen Husman",
    links: [LinkedIn("https://www.linkedin.com/in/glenhusman/")],
  },
  {
    name: "Tobias Moser",
    links: [LinkedIn("https://www.linkedin.com/in/tobias-moser-57a462196/")],
  },
  {
    name: "Nathan Bhak",
    links: [LinkedIn("https://www.linkedin.com/in/nathanbhak/")],
  },
]
