"use client";

interface PayPalButtonProps {
  paypalEmail?: string;
  amount?: number;
  itemName?: string;
}

export default function PayPalButtonWidget({
  paypalEmail = "",
  amount = 9.99,
  itemName = "Digital Product",
}: PayPalButtonProps) {
  const paypalUrl = paypalEmail
    ? `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalEmail)}&item_name=${encodeURIComponent(itemName)}&amount=${amount}&currency_code=USD`
    : "#";

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      minWidth: "260px",
      maxWidth: "360px",
      textAlign: "center",
    }}>
      {/* Item Info */}
      <div style={{
        fontSize: "11px",
        fontWeight: 600,
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: "8px",
      }}>
        Instant Purchase
      </div>
      <div style={{
        fontSize: "18px",
        fontWeight: 700,
        color: "#111827",
        marginBottom: "4px",
      }}>
        {itemName}
      </div>
      <div style={{
        fontSize: "28px",
        fontWeight: 800,
        color: "#111827",
        marginBottom: "20px",
        fontVariantNumeric: "tabular-nums",
      }}>
        ${amount.toFixed(2)}
      </div>

      {/* PayPal Button */}
      <a
        href={paypalUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          padding: "14px 24px",
          background: "#FFC439",
          color: "#003087",
          borderRadius: "25px",
          fontWeight: 700,
          fontSize: "16px",
          textDecoration: "none",
          cursor: "pointer",
          border: "none",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 8px rgba(255,196,57,0.3)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "#F5BB30";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,196,57,0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "#FFC439";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(255,196,57,0.3)";
        }}
      >
        <span style={{ fontWeight: 800, fontStyle: "italic" }}>Pay</span>
        <span style={{ fontWeight: 800, fontStyle: "italic", color: "#0070BA" }}>Pal</span>
      </a>

      {/* Footer */}
      <div style={{
        fontSize: "11px",
        color: "#9ca3af",
        marginTop: "12px",
      }}>
        Secure payment via PayPal
      </div>
    </div>
  );
}
