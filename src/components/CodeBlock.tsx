import { useState } from "react";
import { Check, Copy } from "lucide-react";

const KEYWORDS = /\b(func|package|import|return|if|else|for|range|var|const|type|struct|interface|map|chan|go|defer|nil|true|false|public|void|new|class)\b/g;
const STRINGS = /("[^"]*"|'[^']*'|`[^`]*`)/g;
const COMMENTS = /(\/\/[^\n]*|#[^\n]*)/g;
const NUMBERS = /\b(\d+)\b/g;

function highlight(code: string) {
  // protect order: comments, strings, keywords, numbers
  const tokens: { i: number; len: number; cls: string; text: string }[] = [];
  const push = (re: RegExp, cls: string) => {
    let m;
    while ((m = re.exec(code))) tokens.push({ i: m.index, len: m[0].length, cls, text: m[0] });
  };
  push(COMMENTS, "text-muted-foreground italic");
  push(STRINGS, "text-[oklch(0.8_0.16_140)]");
  push(KEYWORDS, "text-[oklch(0.7_0.2_320)] font-semibold");
  push(NUMBERS, "text-[oklch(0.85_0.15_70)]");
  tokens.sort((a, b) => a.i - b.i);
  // remove overlaps
  const filtered: typeof tokens = [];
  let end = -1;
  for (const t of tokens) if (t.i >= end) { filtered.push(t); end = t.i + t.len; }
  const out: (string | JSX.Element)[] = [];
  let cursor = 0;
  filtered.forEach((t, idx) => {
    if (t.i > cursor) out.push(code.slice(cursor, t.i));
    out.push(<span key={idx} className={t.cls}>{t.text}</span>);
    cursor = t.i + t.len;
  });
  if (cursor < code.length) out.push(code.slice(cursor));
  return out;
}

export function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="relative my-5 panel rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[oklch(0.86_0.18_195/15%)] bg-[oklch(0.18_0.025_240/80%)]">
        <span className="label-mono">{lang}</span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-widest text-muted-foreground hover:text-neon transition-colors"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono text-foreground/90">{highlight(code)}</code>
      </pre>
    </div>
  );
}
