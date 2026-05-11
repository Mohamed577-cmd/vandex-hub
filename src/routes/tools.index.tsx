import { createFileRoute } from "@tanstack/react-router";
import { SectionView } from "@/components/SectionView";
import { SECTION_META } from "@/lib/posts";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: `${SECTION_META.tools.label} // VANDEX` },
      { name: "description", content: SECTION_META.tools.tagline },
      { property: "og:title", content: `${SECTION_META.tools.label} // VANDEX` },
      { property: "og:description", content: SECTION_META.tools.tagline },
    ],
  }),
  component: () => <SectionView section="tools" />,
});
