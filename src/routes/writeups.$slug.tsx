import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPostBySlug, SECTION_META } from "@/lib/posts";
import { PostArticle } from "@/components/PostArticle";

export const Route = createFileRoute("/writeups/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug("writeups", params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.title} // VANDEX` },
            { name: "description", content: loaderData.excerpt },
            { property: "og:title", content: loaderData.title },
            { property: "og:description", content: loaderData.excerpt },
          ],
        }
      : {},
  component: WriteupPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground label-mono">
      // {SECTION_META.writeups.label.toUpperCase()} ENTRY NOT FOUND
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground label-mono">
      // ERROR: {error.message}
    </div>
  ),
});

function WriteupPage() {
  const post = Route.useLoaderData();
  return <PostArticle post={post} />;
}
