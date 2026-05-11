import { createFileRoute } from "@tanstack/react-router";
import { SectionView } from "@/components/SectionView";
import { SECTION_META } from "@/lib/posts";

export const Route = createFileRoute("/tips/")({
  head: () => ({
    meta: [
      { title: `${SECTION_META.tips.label} // VANDEX` },
      { name: "description", content: SECTION_META.tips.tagline },
      { property: "og:title", content: `${SECTION_META.tips.label} // VANDEX` },
      { property: "og:description", content: SECTION_META.tips.tagline },
    ],
  }),
  component: () => <SectionView section="tips" />,
});
