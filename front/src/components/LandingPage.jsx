import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Zap, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import GlassHero from "./GlassHero";

const features = [
  {
    icon: Zap,
    title: "Ultra Rapide",
    desc: "Scraping intelligent et conversion instantanée de votre documentation.",
  },
  {
    icon: BookOpen,
    title: "Format Cours",
    desc: "Markdown propre avec table des matières et résumés automatiques.",
  },
  {
    icon: FileText,
    title: "Export Facile",
    desc: "Exportez en PDF, Markdown ou partagez directement vos cours.",
  },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-background)" }}
    >
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="DocScrap Home"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
            style={{
              background: "var(--color-primary)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <BookOpen
              className="w-6 h-6"
              style={{ color: "var(--color-text-inverse)" }}
            />
          </div>
          <span
            className="font-bold text-xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            DocScrap
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          <a
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Fonctionnalités
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Tarifs
          </a>
          <Link to="/dashboard" aria-label="Go to dashboard">
            <Button
              variant="outline"
              size="sm"
              className="font-semibold"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-primary)",
              }}
            >
              Dashboard
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-5xl w-full space-y-12">
          <GlassHero
            title={
              <>
                Transformez la doc en <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)`,
                  }}
                >
                  savoir instantané
                </span>
              </>
            }
            subtitle="Convertissez n'importe quelle documentation technique complexe en un cours structuré, clair et interactif grâce à l'IA."
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/create" aria-label="Create a new course">
                <Button
                  size="lg"
                  className="group font-bold text-base px-8 py-6 rounded-xl transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "var(--color-primary)",
                    color: "var(--color-text-inverse)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  Créer un cours
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/dashboard" aria-label="View your courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold text-base px-8 py-6 rounded-xl"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                    background: "var(--color-surface)",
                  }}
                >
                  Voir mes cours
                </Button>
              </Link>
            </div>
          </GlassHero>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            id="features"
          >
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bento-card p-6"
                  style={{ boxShadow: "var(--shadow-xs)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all hover:scale-110"
                    style={{
                      background: "var(--color-accent)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Sparkles
              className="w-4 h-4"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Propulsé par l'IA | Gratuit et Open Source</span>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-6 text-center text-sm border-t"
        style={{
          borderColor: "var(--color-border-light)",
          color: "var(--color-text-muted)",
        }}
      >
        <p>© 2026 DocScrap. Transformez votre documentation en savoir.</p>
      </footer>
    </div>
  );
}
