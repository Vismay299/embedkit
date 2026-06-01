"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
        copied
          ? "bg-[#0D9488] text-white"
          : "bg-[#F97316] text-white hover:bg-[#EA580C]"
      )}
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy Link
        </>
      )}
    </button>
  );
}

export default function WidgetSuccessPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [embedOpen, setEmbedOpen] = useState(true);
  const [embedCodeOpen, setEmbedCodeOpen] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://embedkit-wheat.vercel.app";
  const embedUrl = `${baseUrl}/embed/${slug}`;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900">Congratulations!</h1>
        <p className="mt-3 text-gray-600 text-lg">
          You have successfully created a new widget.
        </p>
      </div>

      {/* Success Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Embed Link Accordion */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setEmbedOpen(!embedOpen)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🔗</span>
              <div>
                <h3 className="font-semibold text-gray-900">Embed link</h3>
                <p className="text-sm text-gray-500">Share your widget with this link</p>
              </div>
            </div>
            <svg
              className={cn(
                "w-5 h-5 text-gray-400 transition-transform",
                embedOpen && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {embedOpen && (
            <div className="px-5 pb-5 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={embedUrl}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-mono focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]"
                />
                <CopyButton text={embedUrl} />
              </div>
            </div>
          )}
        </div>

        {/* Notion Embedding Instructions */}
        <div className="border-b border-gray-100 p-5">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">📋</span>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">How to embed in Notion</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                Follow these simple steps to add your widget to any Notion page:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0D9488] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <p className="text-sm text-gray-700">
                    In your Notion page, type <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">/embed</code> and select &quot;Embed&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0D9488] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <p className="text-sm text-gray-700">
                    Paste the embed link above into the URL field
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0D9488] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <p className="text-sm text-gray-700">
                    Click &quot;Embed link&quot; and your widget will appear!
                  </p>
                </div>
              </div>
              {/* Simple visual */}
              <div className="mt-5 bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-700">Notion Page</p>
                    <div className="mt-1 h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="w-12 h-12 rounded-lg bg-[#0D9488]/10 border border-[#0D9488]/20 flex items-center justify-center text-xl">
                    🔲
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embed Code Section (Locked - Pro) */}
        <div className="p-5">
          <button
            onClick={() => setEmbedCodeOpen(!embedCodeOpen)}
            className="w-full flex items-center justify-between text-left hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">💻</span>
              <div>
                <h3 className="font-semibold text-gray-900">Embed code</h3>
                <p className="text-sm text-gray-500">Add to your website or blog</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Upgrade
              </span>
              <svg
                className={cn(
                  "w-5 h-5 text-gray-400 transition-transform",
                  embedCodeOpen && "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {embedCodeOpen && (
            <div className="mt-4 p-5 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <span className="text-3xl block mb-2">🔒</span>
              <p className="text-sm text-gray-600 mb-3">
                Embed code is available on the <strong>Pro plan</strong>.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-[#0D9488] text-white text-sm font-semibold hover:bg-[#0F766E] transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0D9488] text-white font-semibold hover:bg-[#0F766E] transition-colors"
        >
          Go to my widgets
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-[#0D9488] text-[#0D9488] font-semibold hover:bg-[#0D9488]/5 transition-colors"
        >
          Go to creation page
        </Link>
      </div>
    </div>
  );
}
