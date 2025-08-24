import { TPuzzle } from "./puzzle"

const BLU: TPuzzle = {
  code: "BLU",
  title: "Blue Gold",
  theme: "The Mummy",
  anchor: "blu",
  difficulty: 2,
  markdownFile: "BLU.md",
}

const CCC: TPuzzle = {
  code: "CCC",
  title: "Curves of the Cursed Cay",
  theme: "Indiana Jones",
  anchor: "ccc",
  difficulty: 5,
  markdownFile: "CCC.md",
  isWrittenUp: false,
}

const FLP: TPuzzle = {
  code: "FLP",
  title: "I'll Flip You For It",
  theme: "Gold Coin",
  anchor: "flp",
  difficulty: 1,
  markdownFile: "FLP.md",
}

const GOS: TPuzzle = {
  code: "GOS",
  title: "Garden of Secrets",
  theme: "National Treasure",
  anchor: "gos",
  difficulty: 5,
  markdownFile: "GOS.md",
}

const JRC: TPuzzle = {
  code: "JRC",
  title: "The Key to the Garden Adventure (Jr Crypto Puzzle)",
  theme: "Dora the Explorer",
  anchor: "jrc",
  difficulty: 1,
  markdownFile: "JRC.md",
}

const MAN: TPuzzle = {
  code: "MAN",
  title: "Smuggler's Manifest",
  theme: "Romancing the Stone",
  anchor: "man",
  difficulty: 4,
  markdownFile: "MAN.md",
  isWrittenUp: false,
}

const MET: TPuzzle = {
  code: "MET",
  title: "Meta: The Treasure of Legrand",
  theme: "Treasure Map",
  anchor: "met",
  difficulty: 5,
  markdownFile: "MET.md",
  isWrittenUp: false,
}

const MOC: TPuzzle = {
  code: "MOC",
  title: "Misdeeds of Chunk",
  theme: "Goonies",
  anchor: "moc",
  difficulty: 3,
  markdownFile: "MOC.md",
}

const NUM: TPuzzle = {
  code: "NUM",
  title: "Numbers",
  theme: "The Gold-Bug",
  anchor: "num",
  difficulty: 1,
  markdownFile: "NUM.md",
}

const OMR: TPuzzle = {
  code: "OMR",
  title: "One More Roll",
  theme: "ElDorado",
  anchor: "omr",
  difficulty: 1,
  markdownFile: "OMR.md",
}

const OWB: TPuzzle = {
  code: "OWB",
  title: "Old World Baubles",
  theme: "Waterworld",
  anchor: "owb",
  difficulty: 4,
  markdownFile: "OWB.md",
}

const SSY: TPuzzle = {
  code: "SSY",
  title: "Sea Shanty",
  theme: "Pirates of the Caribbean",
  anchor: "ssy",
  difficulty: 3,
  markdownFile: "SSY.md",
}

const TPS: TPuzzle = {
  code: "TPS",
  title: "Treasure Pursuit",
  theme: "Treasure Island",
  anchor: "tps",
  difficulty: 5,
  markdownFile: "TPS.md",
  isWrittenUp: false,
}

const TTT: TPuzzle = {
  code: "TTT",
  title: "Thomson and Thompson's Tangled Trails",
  theme: "The Adventures of TinTin",
  anchor: "ttt",
  difficulty: 2,
  markdownFile: "TTT.md",
}

export const puzzlesSiteOrder: TPuzzle[] = [
  BLU,
  GOS,
  SSY,
  CCC,
  NUM,
  TPS,
  OWB,
  TTT,
  JRC,
  MOC,
  MAN,
  OMR,
  FLP,
  MET,
]

export const puzzlesSolvedOrder: TPuzzle[] = [
  JRC,
  FLP,
  MOC,
  NUM,
  TTT,
  OMR,
  CCC,
  SSY,
  TPS,
  BLU,
  OWB,
  MAN,
  GOS,
  MET,
]
