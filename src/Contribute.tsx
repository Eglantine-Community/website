import { DISCORD_URL, REPO_URL } from "./config";

const WAYS: { title: string; detail: string; href: string; cta: string }[] = [
  {
    title: "Report a bug",
    detail:
      "Include your build name, your OS and GPU, the game, and a log. Good reports get fixed faster.",
    href: `${REPO_URL}/issues`,
    cta: "Open an issue",
  },
  {
    title: "Test a branch build",
    detail:
      "Pull requests publish test builds. Try one and say whether it fixes the problem.",
    href: "#download",
    cta: "Find branch builds",
  },
  {
    title: "Send a patch",
    detail:
      "Fork the repository, make your change and open a pull request. Small fixes are welcome.",
    href: `${REPO_URL}/pulls`,
    cta: "See pull requests",
  },
  {
    title: "Talk to us",
    detail: "Ask questions, share findings and follow what's being worked on.",
    href: DISCORD_URL,
    cta: "Join the Discord",
  },
];

export default function Contribute() {
  return (
    <section id="contribute" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Help build Eglantine
      </h2>
      <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-fg/80">
        You don't need to write code to help. Testing and clear bug reports are
        just as valuable.
      </p>
      <dl className="mt-10 grid gap-x-10 gap-y-10 sm:mt-12 md:grid-cols-2 lg:gap-x-16">
        {WAYS.map((w) => (
          <div key={w.title} className="border-l-4 border-berry pl-5">
            <dt className="font-display text-xl font-semibold">{w.title}</dt>
            <dd className="mt-2 max-w-[44ch] leading-relaxed text-fg/80">
              {w.detail}
              <a
                href={w.href}
                className="whitespace-nowrap font-semibold text-rose underline-offset-4 hover:underline"
              >
                {w.cta}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
