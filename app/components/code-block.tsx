import { useMemo, useState } from "react";

interface Props {
  title: string;
  code: string;
}

const highlightCode = (code: string) => {
  const tokens: string[] = [];

  // Helper to hide sensitive parts (comments/strings) so they don't get double-highlighted
  const saveToken = (html: string) => {
    const id = `___TOKEN_${tokens.length}___`;
    tokens.push(html);
    return id;
  };

  // 1. Escape original HTML
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Hide Comments & Strings (preserving them exactly)
  html = html.replace(/(\/\/.*)/g, (match) =>
    saveToken(`<span class="text-slate-500 italic">${match}</span>`),
  );
  html = html.replace(/(["'`].*?["'`])/g, (match) =>
    saveToken(`<span class="text-amber-200">${match}</span>`),
  );

  // 3. Highlight safe code (Keywords, Types, Functions)
  html = html
    .replace(
      /\b(export|function|const|let|return|if|else|import|from|type|interface|as|default)\b/g,
      '<span class="text-pink-400">$1</span>',
    )
    .replace(
      /\b(useState|useRef|useEffect|useCallback|useMemo|useLocalState|useSortableList)\b/g,
      '<span class="text-blue-400">$1</span>',
    )
    .replace(
      /\b(T|number|string|boolean|void|Dispatch|SetStateAction|React|DragEvent|StorageEvent|null|true|false)\b/g,
      '<span class="text-cyan-400 italic">$1</span>',
    )
    // Highlight function names before the parenthesis
    .replace(
      /\b([a-zA-Z0-9_]+)(?=\()/g,
      '<span class="text-blue-400">$1</span>',
    );

  // 4. Restore the hidden tokens
  tokens.forEach((val, i) => {
    html = html.replace(`___TOKEN_${i}___`, val);
  });

  return html;
};

const CodeBlock = ({ title, code }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Memoize the highlighted HTML so it doesn't re-calculate on every render
  const highlightedHtml = useMemo(() => highlightCode(code), [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300">
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span className="ml-2 text-[11px] font-bold text-slate-400 tracking-widest">
              {title}
            </span>
          </div>

          {isOpen && (
            <button
              type="button"
              onClick={handleCopy}
              className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          )}
        </div>

        {/* Code Content Area */}
        <div
          className={`relative transition-all duration-500 ease-in-out ${isOpen ? "" : "max-h-[180px] overflow-hidden"}`}
        >
          <div className="bg-[#0f172a] p-8 text-left overflow-scroll">
            <pre className="text-[13px] font-mono leading-relaxed whitespace-pre">
              <code
                className="block w-full text-slate-300"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <>
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
            </pre>
          </div>

          {/* Centered "View Code" Button Overlay */}
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-slate-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>eye icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Full Code
              </button>
            </div>
          )}
        </div>

        {isOpen && (
          <div className="bg-[#0f172a] border-t border-slate-800 p-2 text-center">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest"
            >
              Collapse Source
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
