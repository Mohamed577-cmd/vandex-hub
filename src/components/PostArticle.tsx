import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Crosshair, Shield } from "lucide-react";
import type { Post } from "@/lib/posts";
import { getPostContent, SECTION_META } from "@/lib/posts";
import { Markdown } from "@/components/Markdown";

export function PostArticle({ post }: { post: Post }) {
  const meta = SECTION_META[post.section];
  const content = getPostContent(post);

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
            hash={meta.id}
            className="inline-flex items-center gap-2 px-4 py-2 glow-border rounded text-neon label-mono hover:bg-[oklch(0.86_0.18_195/8%)] transition"
          >
            <ArrowLeft className="size-3" /> Back to {meta.label}
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="label-mono px-2 py-1 border border-[oklch(0.86_0.18_195/40%)] rounded">
            {post.category}
          </span>
          <span className="label-mono opacity-70">{post.target}</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl mb-6 leading-tight text-foreground">
          {post.title}
        </h1>

        <div className="flex items-center gap-5 text-[0.7rem] text-muted-foreground uppercase tracking-widest mb-10 pb-8 border-b border-[oklch(0.86_0.18_195/15%)] flex-wrap">
          <span className="flex items-center gap-1.5"><Calendar className="size-3" />{post.date}</span>
          <span className="flex items-center gap-1.5"><Crosshair className="size-3" />{post.target}</span>
          <span className="flex items-center gap-1.5"><Clock className="size-3" />{post.readTime}</span>
        </div>

        <Markdown source={content} />

        <div className="mt-16 pt-8 border-t border-[oklch(0.86_0.18_195/15%)]">
          <Link
            to="/"
            hash={meta.id}
            className="inline-flex items-center gap-2 px-4 py-2.5 glow-border rounded text-neon label-mono hover:bg-[oklch(0.86_0.18_195/8%)] transition"
          >
            <ArrowLeft className="size-3" /> Back to {meta.label}
          </Link>
        </div>
      </article>
    </div>
  );
}
