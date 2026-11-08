const STEPS: { title: string; detail: string }[] = [
  {
    title: "Download a build",
    detail:
      "Pick your operating system and a release channel in the Download section. No stable available, Daily Builds are the most stable.",
  },
  {
    title: "Add your games",
    detail: "Point Eglantine at a folder of games you dumped yourself.",
  },
  {
    title: "Launch and enjoy",
    detail: "Enjoy playing Switch 2 games on your pc!",
  },
  {
    title: "Report Issues",
    detail:
      "Something crashes or looks wrong? Help the community! Open an issue or tell us on Discord, with your build name and a log.",
  },
];

export default function GettingStarted() {
  return (
    <section id="start" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Getting started
      </h2>
      <ol className="mt-10 grid gap-x-10 gap-y-10 sm:mt-12 md:grid-cols-2 lg:gap-x-16">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-5">
            <span
              className="grid size-10 shrink-0 place-items-center rounded-full bg-rose font-display text-lg font-extrabold text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-[44ch] leading-relaxed text-fg/80">
                {s.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
