const QUOTES = [
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
];

export default function InspirationalQuotesWidget() {
  // Deterministic quote based on the current date
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const quote = QUOTES[dayOfYear % QUOTES.length];

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "linear-gradient(135deg, #faf5ff, #fdf2f8)",
      borderRadius: "12px",
      border: "1px solid #f3e8ff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      minWidth: "240px",
      maxWidth: "420px",
    }}>
      <div style={{ fontSize: "28px", marginBottom: "14px" }}>💬</div>
      <blockquote style={{
        margin: 0,
        fontSize: "16px",
        fontWeight: 500,
        color: "#374151",
        lineHeight: 1.7,
        fontStyle: "italic",
        borderLeft: "3px solid #c084fc",
        paddingLeft: "14px",
      }}>
        "{quote.text}"
      </blockquote>
      <div style={{
        marginTop: "14px",
        fontSize: "13px",
        color: "#9ca3af",
        fontWeight: 600,
        textAlign: "right",
      }}>
        — {quote.author}
      </div>
    </div>
  );
}
