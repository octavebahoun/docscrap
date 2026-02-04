import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import {
  ArrowLeft,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import GlassHero from "./GlassHero";

const steps = [
  { id: 1, name: "URL" },
  { id: 2, name: "Configuration" },
  { id: 3, name: "Génération" },
];

export default function CourseGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setUrl] = useState("");
  const [options, setOptions] = useState({
    includeExamples: true,
    autoSummary: true,
    createToc: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.post("/api/courses/url", { url, options });
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de la génération. Vérifiez l'URL.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: "var(--color-background)" }}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2
              className="h-12 w-12 animate-spin text-primary"
              style={{ color: "var(--color-primary)" }}
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Génération en cours...
              </h3>
              <p className="text-slate-500 mt-2">
                L'IA analyse le contenu et structure votre cours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Return to home"
        >
          <ArrowLeft
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            style={{ color: "var(--color-text-secondary)" }}
          />
          <span
            className="font-medium text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Retour
          </span>
        </Link>
      </div>

      {/* Wizard Container */}
      <div className="w-full max-w-2xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentStep >= step.id ? "scale-110" : ""
                  }`}
                  style={{
                    background:
                      currentStep >= step.id
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                    color:
                      currentStep >= step.id
                        ? "var(--color-text-inverse)"
                        : "var(--color-text-muted)",
                    boxShadow:
                      currentStep === step.id ? "var(--shadow-md)" : "none",
                  }}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className="mt-2 text-xs font-medium"
                  style={{
                    color:
                      currentStep >= step.id
                        ? "var(--color-text-primary)"
                        : "var(--color-text-muted)",
                  }}
                >
                  {step.name}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className="h-0.5 flex-1 mx-4"
                  style={{
                    background:
                      currentStep > step.id
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <GlassHero>
          <div className="w-full max-w-md text-left space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "var(--color-accent)" }}
              >
                <Sparkles
                  className="w-8 h-8"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                {currentStep === 1 && "Entrez l'URL"}
                {currentStep === 2 && "Configurez les options"}
                {currentStep === 3 && "Générez votre cours"}
              </h1>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {currentStep === 1 &&
                  "Collez l'URL de la documentation à convertir"}
                {currentStep === 2 &&
                  "Personnalisez la génération de votre cours"}
                {currentStep === 3 && "Vérifiez et lancez la génération"}
              </p>
            </div>

            {/* Step 1: URL Input */}
            {currentStep === 1 && (
              <div>
                <label
                  htmlFor="url-input"
                  className="block text-sm font-bold mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  URL de la documentation
                </label>
                <input
                  id="url-input"
                  type="url"
                  required
                  placeholder="https://react.dev/learn/..."
                  className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{
                    borderColor: "var(--color-border)",
                    background: "var(--color-surface)",
                    color: "var(--color-text-primary)",
                  }}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  aria-label="Documentation URL"
                />
              </div>
            )}

            {/* Step 2: Options */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeExamples}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        includeExamples: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-2 accent-primary"
                    style={{ borderColor: "var(--color-border)" }}
                    aria-label="Include code examples"
                  />
                  <div className="flex-1">
                    <div
                      className="font-medium text-sm"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Inclure les exemples de code
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Extraire et formater les exemples de code
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.autoSummary}
                    onChange={(e) =>
                      setOptions({ ...options, autoSummary: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-2 accent-primary"
                    style={{ borderColor: "var(--color-border)" }}
                    aria-label="Auto-generate summary"
                  />
                  <div className="flex-1">
                    <div
                      className="font-medium text-sm"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Générer un résumé automatique
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Créer un résumé avec l'IA
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.createToc}
                    onChange={(e) =>
                      setOptions({ ...options, createToc: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-2 accent-primary"
                    style={{ borderColor: "var(--color-border)" }}
                    aria-label="Create table of contents"
                  />
                  <div className="flex-1">
                    <div
                      className="font-medium text-sm"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Créer une table des matières
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Navigation structurée du cours
                    </div>
                  </div>
                </label>
              </div>
            )}

            {/* Step 3: Summary */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "var(--color-accent)" }}
                >
                  <div className="label-text mb-2">URL</div>
                  <div
                    className="font-medium text-sm break-all"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {url}
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{ background: "var(--color-accent)" }}
                >
                  <div className="label-text mb-2">Options sélectionnées</div>
                  <ul
                    className="space-y-1 text-sm"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {options.includeExamples && <li>✓ Exemples de code</li>}
                    {options.autoSummary && <li>✓ Résumé automatique</li>}
                    {options.createToc && <li>✓ Table des matières</li>}
                  </ul>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div
                className="p-4 rounded-xl text-sm font-medium"
                style={{
                  background: "rgba(195, 87, 44, 0.1)",
                  color: "var(--color-error)",
                }}
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1"
                  disabled={loading}
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Retour
                </Button>
              )}

              <Button
                onClick={handleSubmit}
                disabled={loading || (currentStep === 1 && !url)}
                className="flex-1 font-bold"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-text-inverse)",
                }}
              >
                {loading ? (
                  "Génération..."
                ) : currentStep === 3 ? (
                  "Générer le cours"
                ) : (
                  <>
                    Continuer
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </GlassHero>
      </div>
    </div>
  );
}
