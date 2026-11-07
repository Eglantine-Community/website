import { REPO_URL } from "./config";

// Keep these honest and up to date. Replace the TODO lines with real information.
const WORKS: string[] = [
  "Mario Kart World runs on most hardware at minimum 30FPS",
  "Splatoon raiders also runs well",
  "First party support NUP (and soon V2)",
  "OOT Runs cleanly with some minor graphic glitches",
];
const KNOWN_ISSUES: string[] = ["AMD GPU Issues", "OOT Performances"];

export default function Status() {
  return (
    <section id="status" className="mx-auto max-w-6xl px-6 py-24">
      <div className="border-l-4 border-hip pl-6">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Project status
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-fg/80">
          Eglantine is in early development. Expect crashes, missing features
          and builds that change daily.
        </p>
      </div>

      <div className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
        <div>
          <h3 className="font-display text-xl font-semibold">What works</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-fg/80 marker:text-leaf">
            {WORKS.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold">Known issues</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-fg/80 marker:text-hip">
            {KNOWN_ISSUES.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-10 text-fg/80">
        Follow day-to-day progress in the{" "}
        <a
          className="font-semibold underline hover:text-rose"
          href={`${REPO_URL}/commits`}
        >
          commit history
        </a>{" "}
        or the Daily builds.
      </p>
    </section>
  );
}
