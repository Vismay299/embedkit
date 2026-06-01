"use client";

import { useState } from "react";

export default function UpvoteButtonWidget() {
  const [upvotes, setUpvotes] = useState(42);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // Undo vote
      setUpvotes(prev => type === "up" ? prev - 1 : prev + 1);
      setUserVote(null);
    } else if (userVote === null) {
      setUpvotes(prev => type === "up" ? prev + 1 : prev - 1);
      setUserVote(type);
    } else {
      // Switch vote
      setUpvotes(prev => type === "up" ? prev + 2 : prev - 2);
      setUserVote(type);
    }
  };

  return (
    <div style={{
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
    }}>
      <button
        onClick={() => handleVote("up")}
        style={{
          background: userVote === "up" ? "#f0fdf4" : "transparent",
          border: userVote === "up" ? "2px solid #22c55e" : "2px solid #e5e7eb",
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
          if (userVote !== "up") e.currentTarget.style.borderColor = "#d1d5db";
        }}
        onMouseOut={(e) => {
          if (userVote !== "up") e.currentTarget.style.borderColor = "#e5e7eb";
        }}
      >
        <span>👍</span>
      </button>
      <div style={{
        fontSize: "20px",
        fontWeight: 800,
        color: "#111827",
        minWidth: "36px",
        textAlign: "center",
        fontVariantNumeric: "tabular-nums",
      }}>
        {upvotes}
      </div>
      <button
        onClick={() => handleVote("down")}
        style={{
          background: userVote === "down" ? "#fef2f2" : "transparent",
          border: userVote === "down" ? "2px solid #ef4444" : "2px solid #e5e7eb",
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
          if (userVote !== "down") e.currentTarget.style.borderColor = "#d1d5db";
        }}
        onMouseOut={(e) => {
          if (userVote !== "down") e.currentTarget.style.borderColor = "#e5e7eb";
        }}
      >
        <span>👎</span>
      </button>
    </div>
  );
}
