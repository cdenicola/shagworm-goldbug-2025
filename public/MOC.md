# Misdeeds of Chunk Puzzle Writeup

## Puzzle Info

The puzzle is a single image, shown below, with a pirate themed background. There are 12 lines, mostly starting with "I" and describing someone’s actions in the first person, with blanks for most of the words. Each line has a skull marking a single empty letter box. The 13th and last line is filled in:

> "But for all my misdeeds, I befriended Sloth who saved the day."

![13 lines, 12 with blanks, describing an individual's actions](./assets/moc-1.png)

## Solution

Our initial impression of this puzzle was: what? missing words? no patterns? how can we fill them in? The empty spaces did not have any symbols - besides the 12 skulls we concluded were to selected letters for the final solution - that would let us use other filled in spaces to solve. We thought we would have to try random words. Luckily, the pirate background and the names "sloth" and "chunk" tickled something in our brains; like a movie seen decades prior wiggling in recognition. Googling "sloth chunk" brought up this [heartwarming clip](https://www.youtube.com/watch?v=8Q_jpTStdDI) from the movie The Goonies starring the characters Sloth and Chunk. Bingo!

Re-reading the prompts and the title, we thought each line starting with "I" was Chunk explaining something about his life. We pulled open the text script to the The Goonies and grepped for words in the first line. Boom: "In third grade I cheated on my history exam" helped us fill in "I cheated on my history exam in third grade" and unlocked the flag’s first letter "D". We repeated this for each line – when we got stuck on a line, we prompted ChatGPT with the The Goonies script and the question with blanks, then double checked against the movie script to guard against hallucinations – and extracted the letters flagged with a skull.

> I CHEATE**D** on my HISTORY EXAM in THIRD grade.\
> I said FIFTY I**R**ANIAN TERRORISTS took over every SIZZLER STEAKHOUSE in the CITY.\
> I dropped FAKE PUKE over the BALCON**Y** at the THEATER.\
> I said MICHAE**L** JACKSON came to my HOUSE to use the BATHROOM.\
> I broke the PHOTO that ONE-EYED WILLY'S M**A**P was in.\
> I broke Mikey's statue of MICHELA**N**GELO'S DAVID.\
> I said there were CREATURES that MULTIPLIE**D** when they got WET.\
> I ate my WEIGHT in GOD**F**ATHER'S PIZZA.\
> I used my UNCLE MAX'S T**O**UPEE as a BEARD in my SCHOOL PLAY.\
> I said I saved OLD PEOPLE from a FIRE at a N**U**RSING HOME.\
> I got KICKED out of SUMMER CAMP for pigging out at LU**N**CH.\
> I KNOCKED my SISTER down the STAIRS and BLAMED it on the **D**OG.\
> But for all my misdeeds, I BEFRIENDED SLOTH who SAVED the DAY.

Combining these 12 letters in order gave us our flag.

\<solution\>DryLandFound\</solution\>
