import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Activity, ArrowLeft, Search, Shield } from "lucide-react";
import { posts, SECTION_META, type Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export function SectionView({ section }: { section: Post["section"] }) {
  const [query, setQuery] = useState("");
  const meta = SECTION_META[section];

  const items = useMemo(() => {
    const all = posts.filter((p) => p.section === section);
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.target.toLowerCase().includes(q),
    );
  }, [query, section]);

  return (
    <div className="min-h-screen relative">
      <header className="sticky top-0 z-40 border-b border-[oklch(0.86_0.18_195/15%)] backdrop-blur-md bg-[oklch(0.16_0.02_240/85%)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="size-8 rounded glow-border flex items-center justify-center">
              <Shield className="size-4 text-neon" />
            </div>
            <span className="font-display tracking-widest text-foreground group-hover:text-neon transition-colors">
              VANDEX
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 glow-border rounded text-neon label-mono hover:bg-[oklch(0.86_0.18_195/8%)] transition"
          >
            <ArrowLeft className="size-3" /> Home
          </Link>
        </div>
      </header>

      <section className="border-b border-[oklch(0.86_0.18_195/15%)]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="label-mono mb-3 flex items-center gap-2">
            <Activity className="size-3" /> // {meta.label.toUpperCase()}
          </div>
          <h1 className="font-display text-4xl md:text-6xl mb-4">
            {meta.label.split(" ")[0]}{" "}
            <span className="text-neon">
              {meta.label.split(" ").slice(1).join(" ") || "."}
            </span>
          </h1>
          <p className="text-muted-foreground font-sans-ui max-w-2xl">{meta.tagline}.</p>
        </div>
      </section>

      <section className="border-b border-[oklch(0.86_0.18_195/15%)]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="label-mono opacity-70">
            // {String(items.length).padStart(2, "0")} ENTRIES // FEED LIVE
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`grep ${meta.id}: title, target, category…`}
              className="w-full pl-10 pr-4 py-3 panel rounded-md text-sm font-mono outline-none focus:border-[var(--neon)] focus:shadow-[0_0_24px_oklch(0.86_0.18_195/25%)] transition"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-6 py-16">
          {items.length === 0 ? (
            <div className="panel rounded p-10 text-center text-muted-foreground label-mono">
              No matching entries // adjust query
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((p, idx) => (
                <PostCard key={p.slug} post={p} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
