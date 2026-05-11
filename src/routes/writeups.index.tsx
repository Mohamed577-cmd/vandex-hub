import { createFileRoute } from "@tanstack/react-router";
import { SectionView } from "@/components/SectionView";
import { SECTION_META } from "@/lib/posts";

export const Route = createFileRoute("/writeups/")({
  head: () => ({
    meta: [
      { title: `${SECTION_META.writeups.label} // VANDEX` },
      { name: "description", content: SECTION_META.writeups.tagline },
      { property: "og:title", content: `${SECTION_META.writeups.label} // VANDEX` },
      { property: "og:description", content: SECTION_META.writeups.tagline },
    ],
  }),
  component: () => <SectionView section="writeups" />,
});
