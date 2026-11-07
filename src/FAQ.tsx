const QUESTIONS: { q: string; a: string }[] = [
  {
    q: "Do I need a Switch 2 to use Eglantine?",
    a: "Yes, in practice. You need games dumped from a console you own. Eglantine doesn't include any of them and can't help you find them.",
  },
  {
    q: "Is this better than another fork?",
    a: "Eglantine is the upstream most forks like Lichii or Orchid depend on, we focus on stability for most users and overall game compatibility.",
  },
  {
    q: "Is this legal?",
    a: "Emulators are legal in many countries, but laws differ and depend on how your files were obtained. Use only files you dumped yourself, and check your local rules. This isn't legal advice.",
  },
  {
    q: "How is Eglantine different from Eden?",
    a: "Eglantine builds on the Eden codebase and focuses on Switch 2 support.",
  },
  {
    q: "Which build should I download?",
    a: "Currently: Daily Builds. Stable if you want the least trouble. Release candidates preview the next stable version. Daily builds follow the main branch and may break. Branch builds test individual pull requests.",
  },
  {
    q: "Why does my game crash or look wrong?",
    a: "Eglantine is early software, so some games don't work yet. Check the project status, then open an issue with your build name, OS, GPU, the game and a log.",
  },
  {
    q: "Can I get games, firmware or keys from you?",
    a: "No. We don't provide them and we don't support piracy. Requests for them aren't allowed on the Discord.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Questions
      </h2>
      <div className="mt-10 divide-y border-y border-fg/15">
        {QUESTIONS.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden="true"
                className="text-2xl leading-none text-rose transition-transform group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-[60ch] leading-relaxed text-fg/80">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
