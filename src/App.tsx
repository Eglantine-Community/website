import Downloads from "./Downloads";
import ThemeToggle from "./ThemeToggle";
import { REPO_URL, SITE_NAME } from "./config";
import EglantineLogo from "./assets/logo.png";

// Replace with real, verified claims about the emulator.
const FACTS: { term: string; detail: string }[] = [
  {
    term: "Built on Eden",
    detail:
      "Eglantine builds on the Eden codebase and tracks its progress on the nx2 branch.",
  },
  {
    term: "Windows, Linux, macOS",
    detail:
      "Every build is produced per platform: Windows, Ubuntu 24.04 and macOS.",
  },
  {
    term: "Open source",
    detail: "Read the code, report bugs and send patches on GitHub.",
  },
  {
    term: "Transparent releases",
    detail:
      "Daily builds list their commits. Stable versions ship with a changelog.",
  },
];

export default function App() {
  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a
          href="#"
          className="font-display text-2xl font-extrabold tracking-tight"
        >
          {SITE_NAME}
        </a>
        <nav className="flex items-center gap-6 text-sm font-semibold">
          <a href="#about" className="hover:text-rose">
            About
          </a>
          <a href="#download" className="hover:text-rose">
            Download
          </a>
          <a
            href={REPO_URL}
            className="rounded-full bg-fg px-4 py-2 text-page hover:bg-leaf hover:text-white"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </header>

      <main>
        <section className="relative mx-auto grid max-w-6xl items-center gap-10 overflow-hidden px-6 pb-24 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
              Switch 2 games, on the computer you already own.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fg/80">
              Eglantine is an open-source Nintendo Switch 2 emulator built on
              Eden. Pick a build, download it and start testing.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#download"
                className="rounded-full bg-rose px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Download
              </a>
              <a
                href={REPO_URL}
                className="rounded-full border-2 border-fg px-8 py-4 font-semibold hover:bg-fg hover:text-page"
              >
                View the source
              </a>
            </div>
          </div>
          <img
            alt="Eglantine's logo"
            src={EglantineLogo}
            className="mx-auto w-full max-w-md lg:max-w-none"
          />
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            What you get
          </h2>
          <dl className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {FACTS.map((f) => (
              <div key={f.term} className="border-l-4 border-leaf pl-5">
                <dt className="font-display text-xl font-semibold">{f.term}</dt>
                <dd className="mt-2 max-w-[44ch] leading-relaxed text-fg/80">
                  {f.detail}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <Downloads />
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-12 text-sm leading-relaxed text-fg/70">
        <p className="max-w-[70ch]">
          Eglantine doesn’t include or distribute games, firmware or encryption
          keys. You must dump them from a console you own. Eglantine is not
          affiliated with or endorsed by Nintendo. Nintendo Switch is a
          trademark of Nintendo.
        </p>
      </footer>
    </>
  );
}
