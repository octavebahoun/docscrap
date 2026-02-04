import { motion } from "framer-motion";

export default function GlassHero({ title, subtitle, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`glass rounded-3xl p-8 sm:p-12 text-center ${className}`}
      style={{
        minHeight: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {title && (
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h1>
      )}

      {subtitle && (
        <p
          className="text-lg sm:text-xl mb-8 max-w-2xl"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {subtitle}
        </p>
      )}

      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}
