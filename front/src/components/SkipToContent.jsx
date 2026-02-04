export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: "fixed",
        top: "-40px",
        left: 0,
        background: "var(--color-primary)",
        color: "var(--color-text-inverse)",
        padding: "8px 16px",
        textDecoration: "none",
        borderRadius: "0 0 8px 0",
        zIndex: 9999,
        fontWeight: 600,
        transition: "top 0.2s",
      }}
      onFocus={(e) => (e.target.style.top = "0")}
      onBlur={(e) => (e.target.style.top = "-40px")}
    >
      Aller au contenu principal
    </a>
  );
}
