"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Quote {
  text: string;
  author: string;
}

const QUOTES: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  // 5 new diverse quotes
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "We must be the change we wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.", author: "Ralph Waldo Emerson" },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb" },
  { text: "Do not let what you cannot do interfere with what you can do.", author: "John Wooden" },
];

export default function InspirationalQuotesWidget() {
  const [quoteIndex, setQuoteIndex] = useLocalStorage<number>("embedkit-quote-index", 0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNext = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      setVisible(true);
    }, 200);
  }, [setQuoteIndex]);

  const goToPrev = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
      setVisible(true);
    }, 200);
  }, [setQuoteIndex]);

  // Auto-cycle every 30 seconds
  useEffect(() => {
    timerRef.current = setInterval(goToNext, 30000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goToNext]);

  const quote = QUOTES[quoteIndex];
  const displayNumber = quoteIndex + 1;
  const total = QUOTES.length;

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        background: "linear-gradient(135deg, #faf5ff, #fdf2f8)",
        borderRadius: "12px",
        border: "1px solid #f3e8ff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        minWidth: "240px",
        maxWidth: "420px",
        position: "relative",
      }}
    >
      {/* Header row with icon and badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <div style={{ fontSize: "28px" }}>💬</div>
        <span
          style={{
            fontSize: "11px",
            color: "#a78bfa",
            fontWeight: 600,
            background: "#f3e8ff",
            padding: "3px 8px",
            borderRadius: "10px",
          }}
        >
          {displayNumber}/{total}
        </span>
      </div>

      {/* Quote with fade transition */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <blockquote
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 500,
            color: "#374151",
            lineHeight: 1.7,
            fontStyle: "italic",
            borderLeft: "3px solid #c084fc",
            paddingLeft: "14px",
            minHeight: "54px",
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        <div
          style={{
            marginTop: "14px",
            fontSize: "13px",
            color: "#9ca3af",
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          — {quote.author}
        </div>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          gap: "8px",
        }}
      >
        <button
          onClick={goToPrev}
          style={{
            background: "none",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            padding: "6px 12px",
            fontSize: "12px",
            color: "#6b7280",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "#c084fc";
            e.currentTarget.style.borderColor = "#c084fc";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "#6b7280";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          ← Prev
        </button>
        <button
          onClick={goToNext}
          style={{
            background: "none",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            padding: "6px 12px",
            fontSize: "12px",
            color: "#6b7280",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "#c084fc";
            e.currentTarget.style.borderColor = "#c084fc";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "#6b7280";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
