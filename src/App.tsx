import Downloads from "./Downloads";
import ThemeToggle from "./ThemeToggle";
import { DISCORD_URL, REPO_URL, SITE_NAME } from "./config";
import EglantineLogo from "./assets/logo.png";
import { FaDiscord, FaGithub } from "react-icons/fa";
import Status from "./Status";
import GettingStarted from "./Gettingstarted";
import Contribute from "./Contribute";
import Faq from "./FAQ";

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
          <a
            href="#about"
            className="hover:text-rose transition-all duration-200 hover:-translate-y-0.5"
          >
            About
          </a>
          <a
            href="#download"
            className="hover:text-rose transition-all duration-200 hover:-translate-y-0.5"
          >
            Download
          </a>
          <a
            href={REPO_URL}
            className="rounded-full bg-fg px-4 py-2 transition-all flex items-center justify-center gap-1 duration-200 text-page hover:bg-leaf hover:text-white"
          >
            <FaGithub />
            <span className="hidden sm:inline">GitHub</span>
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
            <div className="mt-10 flex flex-wrap gap-3 lg:flex-nowrap">
              <a
                href="#download"
                className="rounded-full bg-rose px-6 py-3.5 font-semibold whitespace-nowrap text-white transition-transform hover:-translate-y-0.5"
              >
                Download
              </a>
              <a
                href={REPO_URL}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-fg px-6 py-3.5 font-semibold whitespace-nowrap hover:bg-fg hover:text-page"
              >
                <FaGithub />
                View the source
              </a>
              <a
                href={DISCORD_URL}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-fg px-6 py-3.5 font-semibold whitespace-nowrap hover:bg-fg hover:text-page"
              >
                <FaDiscord />
                Join the Discord
              </a>
            </div>
          </div>
          <img
            alt="Eglantine's logo"
            src={EglantineLogo}
            fetchPriority="high"
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

        <Status />
        <GettingStarted />
        <Downloads />
        <Contribute />
        <Faq />
      </main>

      <footer className="border-t border-fg/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 text-sm leading-relaxed text-fg/70 md:flex-row md:justify-between">
          <p className="max-w-[60ch]">
            Eglantine doesn't include or distribute games, firmware or
            encryption keys. You must dump them from a console you own.
            Eglantine is not affiliated with or endorsed by Nintendo. Nintendo
            Switch is a trademark of Nintendo.
          </p>

          <nav aria-label="Footer" className="flex shrink-0 gap-12">
            <div className="flex flex-col gap-2">
              <span className="font-display font-semibold text-fg">
                Project
              </span>
              <a href={REPO_URL} className="hover:text-rose">
                GitHub
              </a>
              <a href={`${REPO_URL}/releases`} className="hover:text-rose">
                Releases
              </a>
              <a href={`${REPO_URL}/issues`} className="hover:text-rose">
                Report a bug
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-display font-semibold text-fg">
                Community
              </span>
              <a href={DISCORD_URL} className="hover:text-rose">
                Discord
              </a>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
}
