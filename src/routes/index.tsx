import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, Shield, Terminal, X, Github, Mail, Activity } from "lucide-react";
import { posts, SECTION_META, type Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Markdown } from "@/components/Markdown";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VANDEX // Web Security Research & Recon" },
      { name: "description", content: "Vandex — web application security writeups, recon tooling, and invariant-breaking research by an offensive security engineer." },
      { property: "og:title", content: "VANDEX // Web Security Research" },
      { property: "og:description", content: "Writeups, tools, and methodology from a web security researcher building recon intelligence and breaking application logic." },
    ],
  }),
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "writeups", label: "Writeups" },
  { id: "tools", label: "Tools" },
  { id: "tips", label: "Tips" },
  { id: "invariant", label: "Invariant" },
  { id: "about", label: "About_Me" },
];

function Index() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Post | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.target.toLowerCase().includes(q),
    );
  }, [query]);

  const bySection = (section: Post["section"]) => filtered.filter((p) => p.section === section);

  useEffect(() => {
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [active]);

  return (
    <div className="min-h-screen relative">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-[oklch(0.86_0.18_195/15%)] backdrop-blur-md bg-[oklch(0.16_0.02_240/85%)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="size-8 rounded glow-border flex items-center justify-center">
              <Shield className="size-4 text-neon" />
            </div>
            <span className="font-display tracking-widest text-foreground group-hover:text-neon transition-colors">VANDEX</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="label-mono opacity-70 hover:opacity-100 hover:text-neon transition">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#writeups"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 glow-border rounded text-neon label-mono hover:bg-[oklch(0.86_0.18_195/8%)] transition"
          >
            <Terminal className="size-3" /> Enter Feed
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden border-b border-[oklch(0.86_0.18_195/15%)]">
        <div className="scan-line" />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="flex items-center gap-3 mb-8">
            <span className="size-2 rounded-full bg-[var(--neon)] pulse-dot shadow-[0_0_10px_var(--neon)]" />
            <span className="label-mono">SECURITY RESEARCH // STATUS: ACTIVE</span>
          </div>
          <h1 className="font-display text-6xl sm:text-7xl md:text-9xl text-foreground leading-[0.9] mb-6">
            VAN<span className="text-neon">DEX</span>
            <span className="text-neon">_</span>
          </h1>
          <p className="font-sans-ui text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            Web application security researcher. Building recon tooling, breaking web logic,
            and documenting offensive methodology — one invariant at a time.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#writeups" className="px-5 py-3 glow-border rounded text-neon label-mono hover:bg-[oklch(0.86_0.18_195/8%)] transition">
              Browse Writeups →
            </a>
            <a href="#about" className="px-5 py-3 panel rounded label-mono text-muted-foreground hover:text-foreground transition">
              About Operator
            </a>
          </div>

          {/* HUD strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16">
            {[
              { k: "WRITEUPS", v: posts.filter((p) => p.section === "writeups").length.toString().padStart(2, "0") },
              { k: "TOOLS_RELEASED", v: "07" },
              { k: "INVARIANTS_BROKEN", v: "42" },
              { k: "UPTIME", v: "99.9%" },
            ].map((s) => (
              <div key={s.k} className="panel rounded-md p-4">
                <div className="label-mono opacity-70 mb-2">{s.k}</div>
                <div className="font-display text-2xl text-neon">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VULNERABILITY FEED / SEARCH */}
      <section className="border-b border-[oklch(0.86_0.18_195/15%)]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="label-mono mb-2">// VULNERABILITY FEED — LIVE</div>
            <h2 className="font-display text-3xl md:text-4xl">
              Search the <span className="text-neon">stream.</span>
            </h2>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="grep posts: jwt, recon, idor…"
              className="w-full pl-10 pr-4 py-3 panel rounded-md text-sm font-mono outline-none focus:border-[var(--neon)] focus:shadow-[0_0_24px_oklch(0.86_0.18_195/25%)] transition"
            />
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      {(["writeups", "tools", "tips", "invariant"] as const).map((sec) => {
        const meta = SECTION_META[sec];
        const items = bySection(sec);
        return (
          <section key={sec} id={meta.id} className="border-b border-[oklch(0.86_0.18_195/15%)]">
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
                <div>
                  <div className="label-mono mb-3 flex items-center gap-2">
                    <Activity className="size-3" /> // {meta.label.toUpperCase()}
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl">
                    {meta.label.split(" ")[0]}{" "}
                    <span className="text-neon">{meta.label.split(" ").slice(1).join(" ") || "."}</span>
                  </h2>
                </div>
                <p className="text-muted-foreground font-sans-ui max-w-md">{meta.tagline}.</p>
              </div>

              {items.length === 0 ? (
                <div className="panel rounded p-10 text-center text-muted-foreground label-mono">
                  No matching entries // adjust query
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p, idx) => (
                    <PostCard key={p.slug} post={p} index={idx} onOpen={setActive} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* ABOUT */}
      <section id="about" className="border-b border-[oklch(0.86_0.18_195/15%)]">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
          <div>
            <div className="label-mono mb-3">// ABOUT_ME</div>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              vandex<span className="text-neon">_</span>
            </h2>
            <p className="font-sans-ui text-muted-foreground text-lg leading-relaxed mb-4">
              Web Application Security Researcher.
            </p>
            <p className="font-sans-ui text-muted-foreground leading-relaxed">
              Building recon tooling, breaking web logic, documenting offensive methodology.
            </p>

            <div className="mt-8 flex gap-3">
              <a href="#" className="px-4 py-2.5 glow-border rounded text-neon label-mono inline-flex items-center gap-2 hover:bg-[oklch(0.86_0.18_195/8%)] transition">
                <Github className="size-3" /> Github
              </a>
              <a href="#" className="px-4 py-2.5 panel rounded label-mono text-muted-foreground inline-flex items-center gap-2 hover:text-foreground transition">
                <Mail className="size-3" /> Contact
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="panel panel-hover rounded-md p-6">
              <div className="label-mono mb-3">// FOCUS_AREAS</div>
              <ul className="space-y-2 font-sans-ui text-muted-foreground">
                {["Web application security", "Recon automation", "Attack surface intelligence", "Bug bounty methodology research"].map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-neon">▸</span>{x}</li>
                ))}
              </ul>
            </div>

            <div className="panel panel-hover rounded-md p-6">
              <div className="label-mono mb-3">// PHILOSOPHY</div>
              <p className="font-sans-ui text-muted-foreground leading-relaxed">
                I focus on understanding application behavior, trust boundaries, and{" "}
                <span className="text-neon">invariant-breaking</span> rather than relying on blind automation.
              </p>
            </div>

            <div className="panel panel-hover rounded-md p-6">
              <div className="label-mono mb-3">// CURRENT_WORK</div>
              <ul className="space-y-2 font-sans-ui text-muted-foreground">
                {["Expanding vandex-gf", "Building recon intelligence workflows", "Researching logic-driven testing methodology"].map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-neon">▸</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground label-mono">
        <span>© 2025 VANDEX // ALL_RIGHTS_RESERVED</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--neon)] pulse-dot" />
          STREAM_OPEN
        </span>
      </footer>

      {/* POST MODAL */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-stretch md:items-center justify-center p-0 md:p-6 bg-[oklch(0.1_0.02_240/85%)] backdrop-blur-sm" onClick={() => setActive(null)}>
          <div
            className="panel rounded-md max-w-3xl w-full max-h-full overflow-y-auto relative glow-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-[oklch(0.86_0.18_195/15%)] bg-[oklch(0.18_0.025_240/95%)] backdrop-blur">
              <div className="flex items-center gap-3 min-w-0">
                <span className="label-mono px-2 py-1 border border-[oklch(0.86_0.18_195/40%)] rounded shrink-0">{active.category}</span>
                <span className="label-mono opacity-70 truncate">{active.target} // {active.readTime}</span>
              </div>
              <button onClick={() => setActive(null)} className="text-muted-foreground hover:text-neon transition" aria-label="Close">
                <X className="size-5" />
              </button>
            </div>
            <article className="p-6 md:p-10">
              <div className="label-mono mb-3">{active.date}</div>
              <h1 className="font-display text-3xl md:text-4xl mb-6 leading-tight">
                {active.title}
              </h1>
              <Markdown source={active.content} />
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
