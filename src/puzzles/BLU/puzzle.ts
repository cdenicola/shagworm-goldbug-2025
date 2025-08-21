import { TPuzzle } from "../../puzzle"
import artifact1 from "./artifact1.png"
import artifact2 from "./artifact2.png"

const BLU: TPuzzle = {
  code: "BLU",
  title: "Blue Gold",
  theme: "The Mummy",
  anchor: "blu",
  difficulty: 2,
  markdownFile: "BLU.md",
  artifacts: [
    {
      type: "image",
      url: artifact1,
      description: "The initial image provided in the puzzle.",
    },
    {
      type: "image",
      url: artifact2,
      description:
        "The scarabs with the correct color subtraction (ordered R, G, B from top to bottom).",
    },
  ],
}

export default BLU
