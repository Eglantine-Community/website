import { useEffect, useState } from "react";
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
    <section id="download" className="bg-ink text-petal">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Download Eglantine
        </h2>

        <div
          role="tablist"
          aria-label="Operating system"
          className="mt-10 flex flex-wrap gap-2"
        >
          {(Object.keys(OS_LABEL) as OS[]).map((o) => (
            <button
              key={o}
              role="tab"
              aria-selected={os === o}
              onClick={() => setOs(o)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${os === o ? "bg-rose text-white" : "bg-white/10 hover:bg-white/20"}`}
            >
              {OS_LABEL[o]}
            </button>
          ))}
        </div>

        <div
          role="tablist"
          aria-label="Release channel"
          className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-b border-white/15"
        >
          {CHANNELS.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={channel === c.id}
              onClick={() => setChannel(c.id)}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold ${channel === c.id ? "border-pollen text-pollen" : "border-transparent text-petal/70 hover:text-petal"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-petal/70">
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
            <p className="text-petal/70">Loading releases…</p>
          )}
          {releases && !latest && (
            <p>
              No {CHANNELS.find((c) => c.id === channel)!.label.toLowerCase()}
              build yet. Try another channel.
            </p>
          )}
          {latest && (
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-display text-2xl font-semibold">
                  {latest.name || latest.tag_name}
                </p>
                <p className="mt-1 text-sm text-petal/70">
                  Published {fmtDate(latest.published_at)} ·
                  <a className="underline" href={latest.html_url}>
                    Release notes
                  </a>
                </p>
              </div>
              {asset ? (
                <a
                  href={asset.browser_download_url}
                  className="rounded-full bg-pollen px-8 py-4 font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  Download for {OS_LABEL[os].split(" ")[0]} ({mb(asset.size)})
                </a>
              ) : (
                <a
                  href={latest.html_url}
                  className="rounded-full border border-petal/40 px-8 py-4 font-semibold hover:bg-white/10"
                >
                  No {OS_LABEL[os].split(" ")[0]} file in this release — see all
                  files
                </a>
              )}
            </div>
          )}
          {older.length > 0 && (
            <ul className="mt-10 divide-y divide-white/10 border-t border-white/10 text-sm">
              {older.map((r) => (
                <li key={r.id} className="flex justify-between py-3">
                  <a className="hover:underline" href={r.html_url}>
                    {r.name || r.tag_name}
                  </a>
                  <span className="text-petal/60">
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
