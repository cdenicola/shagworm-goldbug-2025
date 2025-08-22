# Numbers Puzzle Writeup

We will write up this puzzle later. If you want the writeup sooner, message us on Discord!

## Puzzle Info

Difficulty: 1 star  
We came upon a page with three elements: a goldbug logo on top, text with strange symbols in the middle, and triplets of numbers on the bottom.  
![][image1]

## Solution

Our first thoughts were that the goldbug logo was for style, the first text was a symbol cipher we did not recognize, and the second text was formatted like a [book cipher](https://en.wikipedia.org/wiki/Book_cipher). We needed to find the book or paper to act as the book cipher key. Looking through a list of symbol ciphers we noticed the gold-bug cipher matched the non-standard characters in the ciphertext; and the gold-bug competition logo was prompting the cipher.

| Ciphertext                                 | Hint/Clue                               |
| :----------------------------------------- | :-------------------------------------- |
| 61:‡?5(8(85†6\*3;46):‡?50(85†:7\*‡\];4878: | IFYOUAREREADINGTHISYOUALREADYKNOWTHEKEY |
| :‡?95:\*88†;‡(85†9‡(8;‡?\*0‡-7;48-‡†8      | YOUMAYNEEDTOREADMORETOUNLOCKTHECODE     |
| †5\*58);8)‡12‡);‡\*95:480.61:‡?5(80‡);     | DANAESTESOFBOSTONMAYHELPIFYOUARELOST    |

"If you are reading this you already know the key", "you may need to read more", and "dana estes of boston". Since we had to know the gold-bug cipher to read the text, we realized the key for the cipher was Poe’s Gold-bug book. And the hint gave us the publication too\!

We found "The Gold-Bug" by Edgar Allan Poe published by Boston Dana Estes ([link](https://tile.loc.gov/storage-services/public/gdcmassbookdig/goldbug00poee_0/goldbug00poee_0.pdf)). Using page line-line-letter lookup, we found nonsense.

| 50-23-1 38-11-2 16-22-5 70-12-5 26-4-8 12-10-6 59-4-4 38-18-9 73-26-6 47-8-6 12-10-4 40-25-5 14-9-4 | T T R F H I D I E H H H R |
| :-------------------------------------------------------------------------------------------------: | :------------------------ |

Switching to a page-line-word lookup, we extracted:

|               Ciphertext               |      Hint/Clue       |
| :------------------------------------: | :------------------: |
| 50-23-1 38-11-2 16-22-5 70-12-5 26-4-8 | 30 and 2 {and, 13} 3 |
| 12-10-6 59-4-4 38-18-9 73-26-6 47-8-6  | 20 and 2 {and, 13} 6 |
|         12-10-4 40-25-5 14-9-4         |        15 5 1        |

Score! It looked like another round of book ciphers, fitting the clue "you may need to read more". We found two options because we could not determine if "forty-one" was one or two words. We first tried "and" because it seemed to easily allow for three word lookups:

|   Ciphertext   | Interpretation | Hint/Clue |
| :------------: | :------------: | :-------: |
| 30 and 2 and 3 |     30-2-3     |   When    |
| 20 and 2 and 6 |     20-2-6     |    Say    |
|     15 5 1     |     15-5-1     |   Back    |

That gave us the string "When Say Back", which is one character short of a proper solution. We double and tripled checked, but alas our missing letter was nowhere to be found.

We decided to take a further look at the other option, choosing "thirteen" as our fourth word. It was initially unclear to us how we could turn 4 numbers into a book cipher lookup. After trying to regroup the number into triplets to no avail, we realized that "30 and 2" could mean "32".

|  Ciphertext   | Interpretation | Hint/Clue |
| :-----------: | :------------: | :-------: |
| 30 and 2 13 3 |    32-13-3     |   Take    |
| 20 and 2 13 6 |    22-13-6     |   Mine    |
|    15 5 1     |     15-5-1     |   Back    |

Solved\! <result>TakeMineBack</result>
