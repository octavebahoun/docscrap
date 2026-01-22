import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Loader2, AlertCircle, Edit3, Eye } from "lucide-react";
import { useReactToPrint } from "react-to-print";

const MarkdownLoader = () => {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("split"); // "edit", "preview", "split"
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/courses/markdown")
      .then((response) => {
        if (!response.ok) throw new Error("Fichier non trouvé");
        return response.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger le document distant.");
        setMarkdown("# Erreur\nImpossible de charger le fichier.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">
          Chargement du document...
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
          onClick={() => window.location.reload()}
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
        {/* Colonne 1 : L'Éditeur */}
        {(view === "edit" || view === "split") && (
          <motion.div
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
          </motion.div>
        )}

        {/* Colonne 2 : L'Aperçu */}
        {(view === "preview" || view === "split") && (
          <motion.div
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
                className=" prose prose-slate prose-lg max-w-none"
              >
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </article>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MarkdownLoader;
