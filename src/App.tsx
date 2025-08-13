import React, { useState } from "react";
import "./App.css";
import { Switch } from "./components/ui/switch";

type Puzzle = {
  code: string;
  title: string;
  theme: string;
  anchor: string;
  difficulty: number;
};

const puzzles: Puzzle[] = [
  { code: "BLU", title: "Blue Gold", theme: "The Mummy", anchor: "blu", difficulty: 2},
  { code: "GOS", title: "Garden of Secrets", theme: "National Treasure", anchor: "gos", difficulty: 5},
  { code: "SSY", title: "Sea Shanty", theme: "Pirates of the Caribbean", anchor: "ssy", difficulty: 3},
  { code: "CCC", title: "Curves of the Cursed Cay", theme: "Indiana Jones", anchor: "ccc", difficulty: 5},
  { code: "NUM", title: "Numbers", theme: "The Gold-Bug", anchor: "num", difficulty: 1},
  { code: "TPS", title: "Treasure Pursuit", theme: "Treasure Island / Planet", anchor: "tps", difficulty: 5},
  { code: "OWB", title: "Old World Baubles", theme: "Waterworld", anchor: "owb", difficulty: 4},
  { code: "TTT", title: "Thomson and Thompson's Tangled Trails", theme: "The Adventures of TinTin", anchor: "ttt", difficulty: 2 },
  { code: "JCR", title: "The Key to the Garden Adventure (Jr Crypto Puzzle)", theme: "Dora the Explorer", anchor: "jcr" , difficulty: 1},
  { code: "MOC", title: "Misdeeds of Chunk", theme: "Goonies", anchor: "moc", difficulty: 3 },
  { code: "MAN", title: "Smuggler's Manifest", theme: "Romancing the Stone", anchor: "man", difficulty: 4 },
  { code: "OMR", title: "One More Roll", theme: "The Road to El Dorado", anchor: "omr", difficulty: 1},
  { code: "FLP", title: "I'll Flip You For It", theme: "Gold Coin", anchor: "flp", difficulty: 1 },
  { code: "MET", title: "Meta: The Treasure of Legrand", theme: "Treasure Map", anchor: "met", difficulty: 5 },
];

function AnsiHeader() {
  return (
    <div id="top" className="font-mono">
      <pre className="whitespace-pre-wrap leading-none text-[10px] sm:text-base md:text-lg text-yellow-300">
{String.raw`
███████╗██╗  ██╗ █████╗  ██████╗ ██╗    ██╗ ██████╗ ██████╗ ███╗   ███╗
██═════╝██║  ██║██╔══██╗██╔════╝ ██║    ██║██╔═══██╗██╔══██╗████╗ ████║
███████╗███████║███████║██║ ████╗██║ █╗ ██║██║   ██║██████╔╝██╔████╔██║
╚════██║██╔══██║██╔══██║██║ ╚═██║██║███╗██║██║   ██║██╔══██╗██║╚██╔╝██║
███████║██║  ██║██║  ██║╚██████╔╝╚███╔███╔╝╚██████╔╝██║  ██║██║ ╚═╝ ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝
`}
      </pre>
      <span className="block text-pink-400 text-2xl mt-2">Stanford Applied Cyber Presents: The Gold Bug — Writeup</span>
    </div>
  );
}

function Badge({ children, color = "bg-yellow-500/20 text-yellow-300 border-yellow-400/40" }: { children: React.ReactNode; color?: string; }) {
  return (
    <span className={`px-2 py-0.5 border ${color} rounded-sm font-mono text-xs`}>
      {children}
    </span>
  );
}

type DifficultyProps = {
  level: number;
  maxStars?: number;
};

export function DifficultyStars({ level, maxStars = 5 }: DifficultyProps) {
  return (
    <span
      className="font-mono text-sm"
      title={`Difficulty: ${level}/${maxStars}`}
    >
      {Array.from({ length: maxStars }, (_, i) => (
        <span
          key={i}
          className={i < level ? "text-yellow-300 star-glint" : "text-gray-500"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function App() {
  const [isPirateMode, setIsPirateMode] = useState(true);
  const [bg, setBg] = useState<"ocean" | "parchment" | "starry">("ocean");

  const pirateText = `Ahoy, matey! We be the crew of the Shagworm, victors of the mighty Crypto & Privacy Village Gold Bug Challenge at DEFCON 33, 2025. Once but humble sailors from the far-flung shores of Stanford's Applied Cyber guild, now we sail the seas of cipher and code, with a deck split 'twixt seasoned hands who've weathered many a Goldbug storm, and greenhorns who'd ne'er before set eyes on such a map of mysteries.

Our charts be marked with trials o' varying peril—each puzzle marked by the Puzzle Masters with one to five gleamin' stars. One star be a calm harbor, five be a storm fit to snap a mast. All treasures we sought were 12-letter phrases—sometimes two or three words lashed together—aye, whether writ in upper, lower, or a mix o' cases, so long as the form be true. In Goldbug waters, the number 12 be more than mere count—it be a key to the very locks ye must pick.

We charted our course through the isles of JRC, FLP, MOC, NUM, TTT, OMR, CCC, SSY, TPS, BLU, OWB, MAN, GOS, and MET, plundering each in turn, until the map lay complete before us.

Should ye wish to parley or swap tales of the hunt, ye'll find us in the Discord tavern—look for @rlama__ or @cooper7840—and mayhap we'll trade secrets over a cask o' rum.`;

  const landlubberText = `Hi! We're the shagworm team, winners of the DEFCON 33, 2025 Goldbug Challenge. We're a group of current and alumni Stanford Applied Cyber members, and we're excited to share our solutions writeup. Our favorite team fact was that our team was half-composed of people who have competed several years in a row, and half who have never even seen a Goldbug puzzle before!

Each puzzle has a difficulty rating set by the puzzle masters of 1 to 5 stars - 1 being the easiest and 5 being the most difficult. All puzzles are a 12 letter (not case-sensitive) combination of words (exception meta puzzle). For example, "TwelveDigits", "twelvedigits", and "TWELVEDIGITS" are in the correct format. This is helpful to know in the context of Goldbug as you are usually looking for "12" as a key relation. Our team solved the puzzles in the following order: 1) JRC 2) FLP 3) MOC 4) NUM 5) TTT 6) OMR 7) CCC 8) SSY 9) TPS 10) BLU 11) OWB 12) MAN 13) GOS 14) MET. 

If you have questions, feel free to ping us on discord: @rlama__ or @cooper7840`;

  const bgClass =
    bg === "ocean" ? "bg-ocean" : bg === "parchment" ? "bg-parchment" : "bg-starry";

  const base = import.meta.env.BASE_URL || "/";
  const goldbugUrl = `${base}assets/pirate/goldbug.png`;

  return (

    <div
      className={`min-h-screen text-green-300 relative ${bgClass}`}
      style={{
        fontFamily: "'VT323', ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6">
          <AnsiHeader />
        </div>

        <div className="flex items-center gap-1 text-xs font-mono justify-end">
          <span className="text-green-300 mr-2">Background:</span>
          <button
            onClick={() => setBg("ocean")}
            className={`px-2 py-1 border rounded-sm ${bg === "ocean" ? "border-yellow-400 text-yellow-300 bg-yellow-900/10" : "border-green-600/40 text-green-200 hover:bg-green-900/20"}`}
          >
            Ocean
          </button>
          <button
            onClick={() => setBg("parchment")}
            className={`px-2 py-1 border rounded-sm ${bg === "parchment" ? "border-yellow-400 text-yellow-300 bg-yellow-900/10" : "border-green-600/40 text-green-200 hover:bg-green-900/20"}`}
          >
            Parchment
          </button>
          <button
            onClick={() => setBg("starry")}
            className={`px-2 py-1 border rounded-sm ${bg === "starry" ? "border-yellow-400 text-yellow-300 bg-yellow-900/10" : "border-green-600/40 text-green-200 hover:bg-green-900/20"}`}
          >
            Starry
          </button>
        </div>

        <div className="border border-green-600/40 rounded-sm p-4 bg-green-900/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl text-green-200">
              <span className="inline mr-2 text-green-200" aria-hidden>🏴‍☠️</span>
              Captain’s Log
            </h3>
            <div className="flex items-center gap-3">
              <Switch
                checked={isPirateMode}
                onCheckedChange={setIsPirateMode}
                className="data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-green-600"
              />
              <span className="text-yellow-300 font-mono text-sm">
                {isPirateMode ? "🏴‍☠️ Pirate Mode" : "⚓ Landlubber Mode"}
              </span>
            </div>
          </div>
          <div className="text-lg whitespace-pre-line">
            {isPirateMode ? pirateText : landlubberText}
          </div>
          <p className="ansi-cursor mt-4 text-pink-400">PRESS ANY KEY TO CONTINUE</p>
        </div>

        <nav className="mt-6 border border-pink-500/40 bg-pink-900/10 rounded-sm p-4">
          <h2 className="text-2xl text-pink-400 mb-2"><span className="inline mr-2 text-yellow-300" aria-hidden>🧭</span> Puzzle Index</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {puzzles.map((p) => (
              <li key={p.code} className="flex items-center justify-between gap-2 border border-green-600/30 rounded-sm px-2 py-1 hover:bg-green-900/20">
                <div className="flex items-center gap-2">
                  <Badge>{p.code}</Badge>
                  <a className="underline text-green-200 hover:text-yellow-300" href={`#${p.anchor}`}>{p.title}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color="bg-blue-500/20 text-blue-300 border-blue-400/40">{p.theme}</Badge>
                  <DifficultyStars level={p.difficulty} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            Original puzzle list:{" "}
            <a className="underline text-yellow-300 hover:text-pink-400" href="https://goldbug.cryptovillage.org/puzzles.html" target="_blank" rel="noreferrer">
              goldbug.cryptovillage.org/puzzles.html
            </a>
          </p>
          <div
            aria-hidden
            className="my-4 h-px w-full opacity-40"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, #d1b06a 0 8px, transparent 8px 16px)" }}
          />
        </nav>

        <section className="mt-8 space-y-6">
          <div className="border border-yellow-500/40 bg-yellow-900/10 rounded-sm p-4">
            <h3 className="text-2xl text-yellow-300 mb-2"><span className="inline mr-2 text-yellow-300" aria-hidden>🗺️</span> Overall Strategy</h3>
            <ul className="list-[>>] pl-6 space-y-1">
              <li>Team composition and roles</li>
              <li>Tooling (solvers, scripts, OCR, crypto helpers)</li>
              <li>Time management and hint usage</li>
              <li>Meta path and ordering notes</li>
            </ul>
          </div>

          <div className="border border-blue-500/40 bg-blue-900/10 rounded-sm p-4">
            <h3 className="text-2xl text-blue-300 mb-2"><span className="inline mr-2 text-blue-300" aria-hidden>⚓</span> Artifacts & Downloads</h3>
            <p className="text-green-200">Drop links to screenshots, PDFs, or code repos here.</p>
            <div className="mt-3">
              <div className="flex gap-3 overflow-x-auto">
                {[
                  { label: "Gold Bug Puzzles", href: "https://goldbug.cryptovillage.org/puzzles.html" },
                  { label: "defcon.social/@goldbug", href: "https://defcon.social/@goldbug" },
                ].map((it) => (
                  <a
                    key={it.href}
                    href={it.href}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 border border-yellow-500/40 rounded-sm bg-black/40 px-3 py-2 hover:bg-black/60 text-yellow-300"
                  >
                    <span className="inline mr-2 text-yellow-300" aria-hidden>☠️</span>
                    {it.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-10">
          {puzzles.map((p) => (
            <article id={p.anchor} key={p.code} className="relative border border-green-600/40 rounded-sm p-4 bg-green-900/10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-sm opacity-5"
                style={{
                  backgroundImage: `url('${goldbugUrl}')`,
                  backgroundSize: "200px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right bottom",
                }}
              />
              <header className="mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{p.code}</Badge>
                  <h3 className="text-3xl text-green-200">{p.title}</h3>
                  <span className="px-2 py-0.5 border bg-blue-500/20 text-blue-300 border-blue-400/40 rounded-sm font-mono text-xs">
                    {p.theme}
                  </span>
                  <div className="ml-auto">
                    <DifficultyStars level={p.difficulty} />
                  </div>
                </div>
              </header>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-yellow-300 text-xl">Prompt</h4>
                  <p className="text-green-200">Paste the puzzle prompt summary here (no copyrighted text verbatim).</p>

                  <h4 className="text-yellow-300 text-xl mt-3">Approach</h4>
                  <ul className="list-[*] pl-6 space-y-1">
                    <li>Observations</li>
                    <li>Hypotheses</li>
                    <li>Transformations/Decodings tried</li>
                    <li>Dead ends</li>
                  </ul>

                  <h4 className="text-yellow-300 text-xl mt-3">Tools</h4>
                  <ul className="list-[+] pl-6 space-y-1">
                    <li>CLI/online tools</li>
                    <li>Scripts</li>
                    <li>References</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-yellow-300 text-xl">Solution</h4>
                  <p className="text-green-200">Final answer phrase and steps to get there.</p>

                  <h4 className="text-yellow-300 text-xl mt-3">Pitfalls</h4>
                  <ul className="list-[!] pl-6 space-y-1">
                    <li>Common mistakes</li>
                    <li>Gotchas</li>
                  </ul>

                  <h4 className="text-yellow-300 text-xl mt-3">Artifacts</h4>
                  <p className="text-green-200">Links to images/files supporting the solution.</p>
                </div>
              </div>

              <footer className="mt-4 text-sm">
                Back to <a className="underline text-pink-400 hover:text-yellow-300" href="#top">Top</a> •{" "}
                <a className="underline text-yellow-300 hover:text-pink-400" href="https://goldbug.cryptovillage.org" target="_blank" rel="noreferrer">CPV BBS</a>
              </footer>
            </article>
          ))}
        </section>

        <section className="mt-10 border border-pink-500/40 bg-pink-900/10 rounded-sm p-4">
          <h3 className="text-2xl text-pink-400 mb-2">Closing Notes</h3>
          <ul className="list-[♥] pl-6 space-y-1">
            <li>Shout-outs</li>
            <li>Lessons learned</li>
            <li>Future improvements</li>
          </ul>
        </section>

        <footer className="mt-8 text-sm border border-yellow-500/40 bg-yellow-900/10 rounded-sm p-6">
          {/* Option 1: Pirate Ship ASCII Art */}
          <div className="text-center mb-4">
            <pre className="text-yellow-300 text-xs leading-none">
{String.raw`
                    |    |    |
                   )_)  )_)  )_)
                  )___))___))___)\\
                 )____)____)_____)\\\\
               _____|____|____|____\\\\\\__
      ---------\                   /---------
        ^^^^^ ^^^^^^^^^^^^^^^^^^^^^
          ^^^^      ^^^^     ^^^    ^^
               ^^^^      ^^^
`}
            </pre>
            <div className="text-pink-400 font-mono text-md mt-2">
              ⚓ Frontend by Cadet{" "}
              <a 
                className="underline text-yellow-300 hover:text-green-300" 
                href="https://devin.ai" 
                target="_blank" 
                rel="noreferrer"
              >
                Devin
              </a>{" "}
              of the SS Shagworm ⚓
            </div>
            <div className="text-green-300 text-xs mt-1">
              "Ahoy! This treasure map was crafted with React & Tailwind by yer friendly AI buccaneer!"
            </div>
          </div>

          {/* Treasure Chest Divider */}
          <div className="text-center my-4">
            <span className="text-yellow-300">💰 ⚔️ 🗺️ ⚔️ 💰</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
