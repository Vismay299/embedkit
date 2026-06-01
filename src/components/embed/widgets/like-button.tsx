"use client";

import { useState } from "react";

export default function LikeButtonWidget() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);

  const handleLike = () => {
    if (liked) {
      setLikeCount(c => c - 1);
    } else {
      setLikeCount(c => c + 1);
    }
    setLiked(!liked);
  };

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px 24px",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      minWidth: "120px",
      maxWidth: "260px",
      textAlign: "center",
    }}>
      <button
        onClick={handleLike}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <span style={{
          fontSize: "36px",
          transition: "transform 0.15s ease",
          display: "inline-block",
        }}>
          {liked ? "❤️" : "🤍"}
        </span>
      </button>
      <div style={{
        fontSize: "16px",
        fontWeight: 700,
        color: liked ? "#ef4444" : "#6b7280",
        marginTop: "4px",
        fontVariantNumeric: "tabular-nums",
      }}>
        {likeCount} {likeCount === 1 ? "like" : "likes"}
      </div>
    </div>
  );
}
