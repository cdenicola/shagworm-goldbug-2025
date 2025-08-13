import "./App.css";

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
          className={i < level ? "text-yellow-300" : "text-gray-500"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-black text-green-300" style={{ fontFamily: "'VT323', ui-monospace, SFMono-Regular, Menlo, monospace" }}>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6">
          <AnsiHeader />
        </div>

        <div className="border border-green-600/40 rounded-sm p-4 bg-green-900/10">
          <p className="text-lg">
            Ahoy, matey! This be me writeup for the DEF CON Crypto & Privacy Village Gold Bug 2025 treasure-hunt puzzle contest.
            This page is a stylized outline you can edit to add full solutions, artifacts, and notes.
            Links and colors pay homage to the CPV BBS aesthetic.
          </p>
          <p className="ansi-cursor mt-2 text-pink-400">PRESS ANY KEY TO CONTINUE</p>
        </div>

        <nav className="mt-6 border border-pink-500/40 bg-pink-900/10 rounded-sm p-4">
          <h2 className="text-2xl text-pink-400 mb-2">Puzzle Index</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {puzzles.map((p) => (
              <a href={`#${p.anchor}`}>
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
              </a>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            Original puzzle list:{" "}
            <a className="underline text-yellow-300 hover:text-pink-400" href="https://goldbug.cryptovillage.org/puzzles.html" target="_blank" rel="noreferrer">
              goldbug.cryptovillage.org/puzzles.html
            </a>
          </p>
        </nav>

        <section className="mt-8 space-y-6">
          <div className="border border-yellow-500/40 bg-yellow-900/10 rounded-sm p-4">
            <h3 className="text-2xl text-yellow-300 mb-2">Overall Strategy</h3>
            <ul className="list-[>>] pl-6 space-y-1">
              <li>Team composition and roles</li>
              <li>Tooling (solvers, scripts, OCR, crypto helpers)</li>
              <li>Time management and hint usage</li>
              <li>Meta path and ordering notes</li>
            </ul>
          </div>

          <div className="border border-blue-500/40 bg-blue-900/10 rounded-sm p-4">
            <h3 className="text-2xl text-blue-300 mb-2">Artifacts & Downloads</h3>
            <p className="text-green-200">Drop links to screenshots, PDFs, or code repos here.</p>
          </div>
        </section>

        <section className="mt-10 space-y-10">
          {puzzles.map((p) => (
            <article id={p.anchor} key={p.code} className="border border-green-600/40 rounded-sm p-4 bg-green-900/10">
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
            <div className="text-pink-400 font-mono text-lg mt-2">
              ⚓ Coded by Captain{" "}
              <a 
                className="underline text-yellow-300 hover:text-green-300" 
                href="https://devin.ai" 
                target="_blank" 
                rel="noreferrer"
              >
                Devin
              </a>{" "}
              of the SS Goldbug ⚓
            </div>
            <div className="text-green-300 text-xs mt-1">
              "Ahoy! This treasure map was crafted with React & Tailwind by yer friendly AI buccaneer!"
            </div>
          </div>

          {/* Treasure Chest Divider */}
          <div className="text-center my-4">
            <span className="text-yellow-300">💰 ⚔️ 🗺️ ⚔️ 💰</span>
          </div>

          {/* Alternative Options (commented out - user can choose) */}
          {/* 
          
          OPTION 2: Compass Rose Design
          <div className="text-center">
            <pre className="text-yellow-300 text-xs">
{String.raw`
        N
        |
    W---+---E
        |
        S
`}
            </pre>
            <div className="text-pink-400">
              🧭 Navigate to adventure - Frontend charted by{" "}
              <a href="https://devin.ai" className="underline text-yellow-300 hover:text-green-300">
                Devin, Master Navigator
              </a>{" "}
              🧭
            </div>
          </div>

          OPTION 3: Treasure Map Style
          <div className="border-2 border-dashed border-yellow-500/60 p-3 bg-yellow-900/20">
            <div className="text-center text-yellow-300">
              📜 TREASURE MAP 📜
            </div>
            <div className="text-center text-pink-400 mt-2">
              X marks the spot where{" "}
              <a href="https://devin.ai" className="underline text-yellow-300 hover:text-green-300">
                Devin the Code Pirate
              </a>{" "}
              buried this frontend treasure!
            </div>
            <div className="text-center text-green-300 text-xs mt-1">
              "Follow the React components to find the golden user experience!"
            </div>
          </div>

          OPTION 4: Adventure Quote Style
          <div className="text-center">
            <div className="text-yellow-300 text-lg">"Fortune favors the bold coder!"</div>
            <div className="text-pink-400 mt-2">
              ⚡ This digital adventure crafted by{" "}
              <a href="https://devin.ai" className="underline text-yellow-300 hover:text-green-300">
                Devin, AI Adventurer
              </a>{" "}
              ⚡
            </div>
            <div className="text-green-300 text-xs mt-1">
              Armed with React, Tailwind, and a treasure trove of algorithms!
            </div>
          </div>

          OPTION 5: Goonies Reference
          <div className="text-center">
            <div className="text-yellow-300">"Goonies never say die... and neither do good developers!"</div>
            <div className="text-pink-400 mt-2">
              🏴‍☠️ Frontend adventure by{" "}
              <a href="https://devin.ai" className="underline text-yellow-300 hover:text-green-300">
                Devin "Truffle Shuffle" AI
              </a>{" "}
              🏴‍☠️
            </div>
          </div>

          OPTION 6: Indiana Jones Style
          <div className="text-center">
            <div className="text-yellow-300">"It belongs in a museum... but this code belongs on the web!"</div>
            <div className="text-pink-400 mt-2">
              🎩 Crafted by Professor{" "}
              <a href="https://devin.ai" className="underline text-yellow-300 hover:text-green-300">
                Devin, Digital Archaeologist
              </a>{" "}
              🎩
            </div>
            <div className="text-green-300 text-xs mt-1">
              "No snakes were harmed in the making of this frontend"
            </div>
          </div>

          OPTION 7: Treasure Island Style
          <div className="text-center">
            <div className="text-yellow-300">"Fifteen men on a dead man's chest... but only one AI coded this!"</div>
            <div className="text-pink-400 mt-2">
              🦜 Yo ho ho and a bottle of... React components! - Captain{" "}
              <a href="https://devin.ai" className="underline text-yellow-300 hover:text-green-300">
                Devin
              </a>{" "}
              🦜
            </div>
          </div>

          OPTION 8: National Treasure Style
          <div className="text-center">
            <div className="text-yellow-300">"I'm going to steal the... user's attention with great UX!"</div>
            <div className="text-pink-400 mt-2">
              🗽 Decoded by{" "}
              <a href="https://devin.ai" className="underline text-yellow-300 hover:text-green-300">
                Devin, Master of Digital Mysteries
              </a>{" "}
              🗽
            </div>
          </div>

          OPTION 9: Minimal Pirate
          <div className="text-center">
            <div className="text-pink-400 text-lg">
              ☠️ Coded by{" "}
              <a href="https://devin.ai" className="underline text-yellow-300 hover:text-green-300">
                Devin
              </a>{" "}
              ☠️
            </div>
            <div className="text-green-300 text-xs mt-1">
              "Arrr! This be fine code, matey!"
            </div>
          </div>

          OPTION 10: Adventure Map
          <div className="text-center">
            <pre className="text-yellow-300 text-xs leading-none">
{String.raw`
    🏝️     🏴‍☠️     ⚓
      \     |     /
       \    |    /
        \   |   /
         \  |  /
          \ | /
           \|/
            X
`}
            </pre>
            <div className="text-pink-400 mt-2">
              Here be dragons... and excellent TypeScript by{" "}
              <a href="https://devin.ai" className="underline text-yellow-300 hover:text-green-300">
                Devin
              </a>!
            </div>
          </div>
          
          */}
        </footer>
      </div>
    </div>
  );
}

export default App;
