import { useEffect, useState } from "react";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { REPO, REPO_URL } from "./config";

type Asset = { name: string; browser_download_url: string; size: number };
type Release = {
  id: number;
  name: string;
  tag_name: string;
  prerelease: boolean;
  published_at: string;
  html_url: string;
  assets: Asset[];
};

type Channel = "stable" | "rc" | "daily" | "branch";
type OS = "windows" | "linux" | "macos";

const CHANNELS: { id: Channel; label: string; hint: string }[] = [
  {
    id: "stable",
    label: "Stable",
    hint: "Tagged versions, e.g. v1.2.0. Safest choice.",
  },
  {
    id: "rc",
    label: "Release candidate",
    hint: "Next stable version, still being tested.",
  },
  {
    id: "daily",
    label: "Daily",
    hint: "Built every day from the main branch.",
  },
  {
    id: "branch",
    label: "Branch builds",
    hint: "Test builds of open pull requests.",
  },
];

const OS_LABEL: Record<OS, string> = {
  windows: "Windows",
  linux: "Linux (Ubuntu 24.04)",
  macos: "macOS",
};
const OS_ICON = {
  windows: <FaWindows aria-hidden="true" />,
  linux: <FaLinux aria-hidden="true" />,
  macos: <FaApple aria-hidden="true" />,
};
const OS_MATCH: Record<OS, RegExp> = {
  windows: /win/i,
  linux: /linux|ubuntu|appimage/i,
  macos: /mac|osx|darwin/i,
};

function detectOS(): OS {
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua) && !/iPhone|iPad/i.test(ua)) return "macos";
  if (/Linux|X11/i.test(ua) && !/Android/i.test(ua)) return "linux";
  return "windows";
}

function classify(r: Release): Channel {
  if (!r.prerelease) return "stable";
  if (/-rc\d*/i.test(r.tag_name)) return "rc";
  if (/build\s+\d{2}\/\d{2}\/\d{4}/i.test(r.name)) return "daily";
  return "branch";
}

const mb = (n: number) => `${(n / 1024 / 1024).toFixed(0)} MB`;
const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Downloads() {
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [error, setError] = useState(false);
  const [channel, setChannel] = useState<Channel>("stable");
  const [os, setOs] = useState<OS>(detectOS);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/repos/${REPO}/releases?per_page=60`, {
      signal: ctrl.signal,
    })
      .then((r) =>
        r.ok ? (r.json() as Promise<Release[]>) : Promise.reject(r.status),
      )
      .then(setReleases)
      .catch((e) => {
        if (e?.name !== "AbortError") setError(true);
      });
    return () => ctrl.abort();
  }, []);

  const inChannel = releases?.filter((r) => classify(r) === channel) ?? [];
  const latest = inChannel[0];
  const asset = latest?.assets.find((a) => OS_MATCH[os].test(a.name));
  const older = inChannel.slice(1, channel === "branch" ? 8 : 4);

  return (
    <section id="download" className="bg-panel text-panel-fg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Download Eglantine
        </h2>

        <div
          role="tablist"
          aria-label="Operating system"
          className="mt-8 flex flex-wrap gap-2 sm:mt-10"
        >
          {(Object.keys(OS_LABEL) as OS[]).map((o) => (
            <button
              key={o}
              role="tab"
              aria-selected={os === o}
              onClick={() => setOs(o)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${os === o ? "bg-rose text-white" : "bg-panel-fg/10 hover:bg-panel-fg/15"}`}
            >
              {OS_ICON[o]}
              {OS_LABEL[o]}
            </button>
          ))}
        </div>

        <div
          role="tablist"
          aria-label="Release channel"
          className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-b border-panel-fg/15 sm:gap-x-6"
        >
          {CHANNELS.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={channel === c.id}
              onClick={() => setChannel(c.id)}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold ${channel === c.id ? "border-rose text-rose" : "border-transparent text-panel-fg/70 hover:text-panel-fg"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-panel-fg/70">
          {CHANNELS.find((c) => c.id === channel)!.hint}
        </p>

        <div className="mt-10 min-h-40" aria-live="polite">
          {error && (
            <p>
              Couldn't load releases from GitHub.
              <a className="underline" href={`${REPO_URL}/releases`}>
                Open the releases page
              </a>
              instead.
            </p>
          )}
          {!error && !releases && (
            <p className="text-panel-fg/70">Loading releases…</p>
          )}
          {releases && !latest && (
            <p>
              No {CHANNELS.find((c) => c.id === channel)!.label.toLowerCase()}
              build yet. Try another channel.
            </p>
          )}
          {latest && (
            <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
              <div>
                <p className="font-display text-2xl font-semibold">
                  {latest.name || latest.tag_name}
                </p>
                <p className="mt-1 text-sm text-panel-fg/70">
                  Published {fmtDate(latest.published_at)} ·
                  <a className="underline" href={latest.html_url}>
                    Release notes
                  </a>
                </p>
              </div>
              {asset ? (
                <a
                  href={asset.browser_download_url}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-8 py-4 font-semibold text-page transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose hover:text-white sm:w-auto"
                >
                  {OS_ICON[os]}
                  Download ({mb(asset.size)})
                </a>
              ) : (
                <a
                  href={latest.html_url}
                  className="inline-flex w-full items-center justify-center rounded-full border border-panel-fg/40 px-8 py-4 text-center font-semibold hover:bg-panel-fg/10 sm:w-auto"
                >
                  No {OS_LABEL[os].split(" ")[0]} file in this release — see all
                  files
                </a>
              )}
            </div>
          )}
          {older.length > 0 && (
            <ul className="mt-10 divide-y divide-panel-fg/10 border-t border-panel-fg/10 text-sm">
              {older.map((r) => (
                <li key={r.id} className="flex justify-between gap-4 py-3">
                  <a className="hover:underline" href={r.html_url}>
                    {r.name || r.tag_name}
                  </a>
                  <span className="shrink-0 text-panel-fg/60">
                    {fmtDate(r.published_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
