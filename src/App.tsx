import Downloads from "./Downloads";
import ThemeToggle from "./ThemeToggle";
import { DISCORD_URL, EDEN_URL, REPO_URL, SITE_NAME } from "./config";
import EglantineLogo from "./assets/logo.png";
import { FaDiscord, FaGithub } from "react-icons/fa";
import Status from "./Status";
import GettingStarted from "./Gettingstarted";
import Contribute from "./Contribute";
import Faq from "./FAQ";
import LogoBackground from "./LogoBackground";

export default function App() {
  return (
    <div className="relative isolate min-h-screen">
      <LogoBackground />
      <div className="relative z-10">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6">
          <a
            href="#"
            className="font-display text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            {SITE_NAME}
          </a>
          <nav className="flex items-center gap-3 text-sm font-semibold sm:gap-6">
            <a
              href="#about"
              className="hidden transition-all duration-200 hover:-translate-y-0.5 hover:text-rose min-[360px]:inline"
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
              className="flex items-center justify-center gap-1 rounded-full bg-fg px-3 py-2 text-page transition-all duration-200 hover:bg-berry hover:text-white sm:px-4"
            >
              <FaGithub />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <ThemeToggle />
          </nav>
        </header>

        <main>
          <section className="relative mx-auto grid max-w-6xl items-center gap-8 overflow-hidden px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24 lg:pt-12">
            <div>
              <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
                Switch 2 games, on the computer you already own.
              </h1>
              <div className="mt-6 flex items-start gap-4">
                <img
                  alt=""
                  aria-hidden="true"
                  src={EglantineLogo}
                  className="mt-0.5 size-12 shrink-0 lg:hidden"
                />
                <p className="max-w-[52ch] text-sm leading-relaxed text-fg/80 sm:text-base lg:text-lg">
                  Eglantine is an open-source Nintendo Switch 2 emulator built on{" "}
                  <a
                    href={EDEN_URL}
                    className="font-semibold underline underline-offset-4 hover:text-rose"
                  >
                    Eden
                  </a>
                  . Pick a build, download it and start testing.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 xl:flex-nowrap">
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
              className="mx-auto hidden w-full max-w-md lg:block lg:max-w-none"
            />
          </section>

          <Status />
          <GettingStarted />
          <Downloads />
          <Contribute />
          <Faq />
        </main>

        <footer className="border-t border-fg/15">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 text-sm leading-relaxed text-fg/70 sm:px-6 sm:py-12 md:flex-row md:justify-between">
            <p className="max-w-[60ch]">
              Eglantine doesn't include or distribute games, firmware or
              encryption keys. You must dump them from a console you own.
              Eglantine is not affiliated with or endorsed by Nintendo. Nintendo
              Switch is a trademark of Nintendo.
            </p>

            <nav aria-label="Footer" className="flex shrink-0 gap-8 sm:gap-12">
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
      </div>
    </div>
  );
}
