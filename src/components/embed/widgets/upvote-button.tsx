"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UpvoteState {
  upvotes: number;
  userVote: "up" | "down" | null;
}

export default function UpvoteButtonWidget() {
  const [state, setState] = useLocalStorage<UpvoteState>("embedkit-upvote", {
    upvotes: 42,
    userVote: null,
  });

  const handleVote = (type: "up" | "down") => {
    setState((prev) => {
      if (prev.userVote === type) {
        // Undo vote
        return {
          upvotes: type === "up" ? prev.upvotes - 1 : prev.upvotes + 1,
          userVote: null,
        };
      } else if (prev.userVote === null) {
        return {
          upvotes: type === "up" ? prev.upvotes + 1 : prev.upvotes - 1,
          userVote: type,
        };
      } else {
        // Switch vote
        return {
          upvotes: type === "up" ? prev.upvotes + 2 : prev.upvotes - 2,
          userVote: type,
        };
      }
    });
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "16px 20px",
        background: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        minWidth: "140px",
        maxWidth: "300px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <button
        onClick={() => handleVote("up")}
        style={{
          background: state.userVote === "up" ? "#f0fdf4" : "transparent",
          border:
            state.userVote === "up" ? "2px solid #22c55e" : "2px solid #e5e7eb",
          borderRadius: "10px",
          padding: "8px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "all 0.15s ease",
          fontSize: "16px",
        }}
        onMouseOver={(e) => {
          if (state.userVote !== "up")
            e.currentTarget.style.borderColor = "#d1d5db";
        }}
        onMouseOut={(e) => {
          if (state.userVote !== "up")
            e.currentTarget.style.borderColor = "#e5e7eb";
        }}
      >
        <span>👍</span>
      </button>
      <div
        style={{
          fontSize: "20px",
          fontWeight: 800,
          color: "#111827",
          minWidth: "36px",
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {state.upvotes}
      </div>
      <button
        onClick={() => handleVote("down")}
        style={{
          background: state.userVote === "down" ? "#fef2f2" : "transparent",
          border:
            state.userVote === "down"
              ? "2px solid #ef4444"
              : "2px solid #e5e7eb",
          borderRadius: "10px",
          padding: "8px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "all 0.15s ease",
          fontSize: "16px",
        }}
        onMouseOver={(e) => {
          if (state.userVote !== "down")
            e.currentTarget.style.borderColor = "#d1d5db";
        }}
        onMouseOut={(e) => {
          if (state.userVote !== "down")
            e.currentTarget.style.borderColor = "#e5e7eb";
        }}
      >
        <span>👎</span>
      </button>
    </div>
  );
}
