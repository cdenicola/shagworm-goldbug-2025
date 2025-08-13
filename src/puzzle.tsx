import { DifficultyStars } from "./App";
import { Badge } from "./components/ui/badge";

export type TArtifact = {
  type: "image" | "file";
  url: string;
  description?: string;
};

export type TPuzzle = {
  code: string;
  title: string;
  theme: string;
  anchor: string;
  difficulty: number;
  prompt?: string;
  approach?: string[];
  tools?: string[];
  solution?: string;
  artifacts?: TArtifact[];
};

export default function PuzzleSection({ p }: { p: TPuzzle }) {
  return (
    <article
      id={p.anchor}
      key={p.code}
      className="border border-green-600/40 rounded-sm p-4 bg-green-900/10"
    >
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

      <div className="grid md:grid-cols-1 gap-4">
        <div className="space-y-2">
          <h4 className="text-yellow-300 text-xl">Prompt</h4>
          <p className="text-green-200">
            {p.prompt ||
              "Paste the puzzle prompt summary here (no copyrighted text verbatim)."}
          </p>

          <h4 className="text-yellow-300 text-xl mt-3">Approach</h4>
          <ul className="list-[*] pl-6 space-y-1">
            {p.approach?.map((a) => (
              <li key={a + p.code}>{a}</li>
            ))}
          </ul>

          <h4 className="text-yellow-300 text-xl mt-3">Tools</h4>
          <ul className="list-[+] pl-6 space-y-1">
            {p.tools?.map((t) => (
              <li key={t + p.code}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-yellow-300 text-xl">Solution</h4>
          <p className="text-green-200">
            {p.solution || "Final answer phrase and steps to get there."}
          </p>

          <h4 className="text-yellow-300 text-xl mt-3">Artifacts</h4>
          <p className="text-green-200">
            {p.artifacts?.map((a, i) => (
              <div key={a.url}>
                Artifact {i + 1}:
                {a.type === "image" && (
                  <img src={a.url} alt={a.description || a.url} />
                )}
                {a.description || a.url}
              </div>
            ))}
          </p>
        </div>
      </div>

      <footer className="mt-4 text-sm">
        Back to{" "}
        <a
          className="underline text-pink-400 hover:text-yellow-300"
          href="#top"
        >
          Top
        </a>{" "}
        •{" "}
        <a
          className="underline text-yellow-300 hover:text-pink-400"
          href="https://goldbug.cryptovillage.org"
          target="_blank"
          rel="noreferrer"
        >
          CPV BBS
        </a>
      </footer>
    </article>
  );
}
