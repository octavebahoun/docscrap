import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Eye, FileText, Share2, Download, Settings } from "lucide-react";
import { useReactToPrint } from "react-to-print";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] =
    useState(`# Bienvenue dans votre Éditeur Premium

Ceci est un exemple de **typographie raffinée**. 

## Pourquoi cette interface ?
1. **Lisibilité maximale** : Utilisation de la police *Outfit* pour le corps du texte.
2. **Confort visuel** : Palette de couleurs *Slate* adoucie.
3. **Expérience fluide** : Transitions fluides entre l'édition et l'aperçu.

### Code et Citations
\`\`\`javascript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

> "Le design n'est pas seulement ce à quoi il ressemble et ce qu'on ressent. Le design est la façon dont il fonctionne." - Steve Jobs

### Tableaux
| Caractéristique | Statut |
| :--- | :--- |
| Typographie | Optimisée |
| Responsive | Oui |
| Performance | Elevée |
`);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const [activeTab, setActiveTab] = useState("both"); // 'edit', 'preview', 'both'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="h-16 glass sticky top-0 z-10 flex items-center justify-between px-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <FileText className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              DocScrap Editor
            </h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              Markdown Pro
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          {[
            { id: "edit", icon: Edit3, label: "Éditer" },
            { id: "both", icon: Settings, label: "Split" },
            { id: "preview", icon: Eye, label: "Aperçu" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Share2 size={20} />
          </button>
          <button 
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
            onClick={handlePrint}
            >
            <Download size={18} />
            <span>Exporter</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 bg-transparent">
            {/* Editor Section */}
            <AnimatePresence mode="wait">
              {(activeTab === "edit" || activeTab === "both") && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200/50 ${
                    activeTab === "edit" ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="bg-slate-50/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>Éditeur</span>
                    <span className="font-mono lowercase opacity-50">
                      {markdown.length} caractères
                    </span>
                  </div>
                  <textarea
                    className="flex-1 p-6 font-mono text-sm text-slate-800 bg-transparent resize-none focus:outline-none leading-relaxed"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Commencez à rédiger..."
                    spellCheck="false"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Preview Section */}
            <AnimatePresence mode="wait">
              {(activeTab === "preview" || activeTab === "both") && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200/50 ${
                    activeTab === "preview" ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="bg-slate-50/50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">
                    Aperçu
                  </div>
                  <div className="flex-1 p-8 overflow-y-auto bg-white custom-scrollbar">
                    <article
                       ref={componentRef} 
                      className="prose prose-slate prose-lg max-w-none 
                      prose-headings:font-bold prose-headings:tracking-tight
                      prose-p:leading-relaxed prose-p:text-slate-600
                      prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                      prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                      prose-pre:bg-slate-900 prose-pre:rounded-xl prose-pre:shadow-lg
                      prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg"
                    >
                      <ReactMarkdown>{markdown}</ReactMarkdown>
                    </article>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default MarkdownEditor;
