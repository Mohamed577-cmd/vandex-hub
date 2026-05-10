import React from "react";
import { CodeBlock } from "./CodeBlock";

// Tiny markdown renderer: supports ## headings, fenced code blocks, bold, blockquote, lists, paragraphs.
export function Markdown({ source }: { source: string }) {
  const blocks: React.ReactElement[] = [];
  const lines = source.split("\n");
  let i = 0;
  let key = 0;

  const inline = (text: string) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((p, idx) => {
      if (p.startsWith("`") && p.endsWith("`"))
        return <code key={idx} className="px-1.5 py-0.5 rounded bg-[oklch(0.22_0.03_240)] text-neon text-[0.85em]">{p.slice(1, -1)}</code>;
      if (p.startsWith("**") && p.endsWith("**"))
        return <strong key={idx} className="text-foreground">{p.slice(2, -2)}</strong>;
      return <span key={idx}>{p}</span>;
    });
  };

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "bash";
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { buf.push(lines[i]); i++; }
      i++;
      blocks.push(<CodeBlock key={key++} code={buf.join("\n")} lang={lang} />);
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(<h2 key={key++} className="font-display text-2xl mt-10 mb-4 text-foreground">{line.slice(3)}</h2>);
      i++; continue;
    }
    if (line.startsWith("> ")) {
      blocks.push(<blockquote key={key++} className="border-l-2 border-[var(--neon)] pl-4 italic text-muted-foreground my-4">{inline(line.slice(2))}</blockquote>);
      i++; continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i++; }
      blocks.push(
        <ul key={key++} className="list-none space-y-1.5 my-4">
          {items.map((it, idx) => (
            <li key={idx} className="flex gap-2 text-muted-foreground">
              <span className="text-neon">▸</span><span>{inline(it)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    blocks.push(<p key={key++} className="my-3 text-muted-foreground leading-relaxed">{inline(line)}</p>);
    i++;
  }
  return <div className="font-sans-ui">{blocks}</div>;
}
