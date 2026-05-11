import { createFileRoute } from "@tanstack/react-router";
import { SectionView } from "@/components/SectionView";
import { SECTION_META } from "@/lib/posts";

export const Route = createFileRoute("/invariant/")({
  head: () => ({
    meta: [
      { title: `${SECTION_META.invariant.label} // VANDEX` },
      { name: "description", content: SECTION_META.invariant.tagline },
      { property: "og:title", content: `${SECTION_META.invariant.label} // VANDEX` },
      { property: "og:description", content: SECTION_META.invariant.tagline },
    ],
  }),
  component: () => <SectionView section="invariant" />,
});
