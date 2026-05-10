import { ArrowUpRight, Clock, Calendar, Crosshair } from "lucide-react";
import type { Post } from "@/lib/posts";

export function PostCard({ post, index, onOpen }: { post: Post; index: number; onOpen: (p: Post) => void }) {
  return (
    <button
      onClick={() => onOpen(post)}
      className="group panel panel-hover rounded-md p-5 text-left flex flex-col gap-4 relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <span className="label-mono opacity-70">// POST-{String(index + 1).padStart(2, "0")}</span>
        <span className="label-mono px-2 py-1 border border-[oklch(0.86_0.18_195/40%)] rounded">
          {post.category}
        </span>
      </div>
      <h3 className="font-display text-xl text-foreground leading-snug group-hover:text-neon transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground font-sans-ui leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>
      <div className="mt-auto pt-4 border-t border-[oklch(0.86_0.18_195/15%)] flex items-center justify-between text-[0.7rem] text-muted-foreground uppercase tracking-widest">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1"><Calendar className="size-3" />{post.date}</span>
          <span className="flex items-center gap-1"><Crosshair className="size-3" />{post.target}</span>
          <span className="flex items-center gap-1"><Clock className="size-3" />{post.readTime}</span>
        </div>
        <ArrowUpRight className="size-4 text-neon opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
}
