import postsData from "@/data/posts.json";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  target: string;
  readTime: string;
  excerpt: string;
  section: "writeups" | "tools" | "tips" | "invariant";
  content: string;
};

export const posts: Post[] = postsData as Post[];

export const SECTION_META: Record<Post["section"], { id: string; label: string; tagline: string }> = {
  writeups: { id: "writeups", label: "Writeups", tagline: "Documented exploits & post-mortems" },
  tools: { id: "tools", label: "Vandex Tools", tagline: "Operator tooling & recon engines" },
  tips: { id: "tips", label: "Tips & Tricks", tagline: "Field-tested one-liners & shortcuts" },
  invariant: { id: "invariant", label: "Invariant & Breaks", tagline: "Logic flaws & broken assumptions" },
};
