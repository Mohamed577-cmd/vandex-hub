import postsData from "@/data/posts.json";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  target: string;
  readTime: string;
  excerpt: string;
  section: "writeups" | "tools" | "tips" | "invariant";
  file: string;
};

export type Post = PostMeta;

export const posts: Post[] = postsData as Post[];

// Eagerly load all markdown files at build time as raw strings.
// Vite resolves this statically — works on any static host (Netlify, etc.).
const contentModules = import.meta.glob("/src/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function getPostContent(post: Pick<Post, "file">): string {
  const key = `/src/content/posts/${post.file}`;
  return contentModules[key] ?? `_Content not found for ${post.file}_`;
}

export function getPostBySlug(section: Post["section"], slug: string): Post | undefined {
  return posts.find((p) => p.section === section && p.slug === slug);
}

export const SECTION_META: Record<Post["section"], { id: string; label: string; tagline: string }> = {
  writeups: { id: "writeups", label: "Writeups", tagline: "Documented exploits & post-mortems" },
  tools: { id: "tools", label: "Vandex Tools", tagline: "Operator tooling & recon engines" },
  tips: { id: "tips", label: "Tips & Tricks", tagline: "Field-tested one-liners & shortcuts" },
  invariant: { id: "invariant", label: "Invariant & Breaks", tagline: "Logic flaws & broken assumptions" },
};
