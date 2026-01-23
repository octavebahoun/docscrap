import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Loader2,
  AlertCircle,
  Edit3,
  Eye,
  Download,
} from "lucide-react";
// import { useReactToPrint } from "react-to-print";

const Geturl = ({ close, onUrlSubmit }) => {
  const [newUrl, setNewUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUrl) return;

    setSubmitting(true);
    try {
      // Appel à la fonction de soumission passée en props
      await onUrlSubmit(newUrl);
      close();
    } catch (err) {
      alert("Erreur lors de l'envoi de l'URL", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Entrer une nouvelle url
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Lien du document
        </label>
        <input
          type="url"
          required
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="https://exemple.com/doc.md"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-2 disabled:bg-blue-300 flex justify-center"
      >
        {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Envoyer"}
      </button>
      <button
        type="button"
        onClick={close}
        className="text-sm text-gray-500 hover:underline"
      >
        Fermer
      </button>
    </form>
  );
};

const MarkdownLoader = () => {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("split"); // "edit", "preview", "split"
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef();

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  const fetchMarkdown = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/courses/markdown",
      );
      if (!response.ok) throw new Error("Fichier non trouvé");
      const text = await response.text();
      setMarkdown(text);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger le document distant.");
      setMarkdown("# Erreur\nImpossible de charger le fichier.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "cours.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Fonction pour envoyer la nouvelle URL au backend
  const handleUrlSubmit = async (url) => {
    setLoading(true); // Afficher le loader global
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:3000/api/courses/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Échec de la conversion");
      }

      // Une fois terminé, on rafraîchit le contenu
      await fetchMarkdown();
    } catch (err) {
      console.error(err);
      setError("Erreur : " + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkdown();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">
          Traitement en cours (Scraping + IA)...
        </p>
        <p className="text-xs text-slate-400">
          Cela peut prendre jusqu'à 30 secondes
        </p>
      </div>
    );
  }

  if (error && !markdown.includes("# Erreur")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{error}</h2>
        <button
          onClick={() => fetchMarkdown()}
          className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="text-indigo-600 w-6 h-6" />
          <h2 className="text-lg font-bold text-slate-900">Document Externe</h2>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setView("edit")}
            className={`p-2 rounded ${
              view === "edit"
                ? "bg-white shadow-sm text-indigo-600"
                : "text-slate-500"
            }`}
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => setView("split")}
            className={`p-2 rounded ${
              view === "split"
                ? "bg-white shadow-sm text-indigo-600"
                : "text-slate-500"
            }`}
          >
            <div className="flex gap-0.5">
              <div className="w-1 h-3 bg-current opacity-50"></div>
              <div className="w-1 h-3 bg-current opacity-50"></div>
            </div>
          </button>
          <button
            onClick={() => setView("preview")}
            className={`p-2 rounded ${
              view === "preview"
                ? "bg-white shadow-sm text-indigo-600"
                : "text-slate-500"
            }`}
          >
            <Eye size={16} />
          </button>

          <button
            onClick={handleDownload}
            className="ml-2 p-2 rounded text-slate-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all"
            title="Télécharger le Markdown"
          >
            <Download size={16} />
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="ml-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-all text-sm"
          >
            Ouvrir le formulaire
          </button>

          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <Motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <Motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="relative bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl z-10"
                >
                  {/* On passe la fonction handleUrlSubmit ici */}
                  <Geturl
                    close={() => setIsOpen(false)}
                    onUrlSubmit={handleUrlSubmit}
                  />
                </Motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
        {(view === "edit" || view === "split") && (
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden ${
              view === "edit" ? "lg:col-span-2" : ""
            }`}
          >
            <div className="bg-slate-50/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">
              Édition
            </div>
            <textarea
              className="flex-1 p-6 font-mono text-sm text-slate-800 bg-transparent outline-none resize-none leading-relaxed"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </Motion.div>
        )}

        {(view === "preview" || view === "split") && (
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden ${
              view === "preview" ? "lg:col-span-2" : ""
            }`}
          >
            <div className="bg-slate-50/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">
              Aperçu
            </div>
            <div className="flex-1 p-8 overflow-y-auto">
              <article
                ref={componentRef}
                className="prose prose-slate prose-lg max-w-none"
              >
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </article>
            </div>
          </Motion.div>
        )}
      </div>
    </div>
  );
};

export default MarkdownLoader;
