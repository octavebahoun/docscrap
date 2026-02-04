import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Eye, FileText, Download, Settings, ChevronLeft, List } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MarkdownEditor = () => {
  const { id } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [toc, setToc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("preview"); 
  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/courses/${id}`);
        const data = response.data;
        
        if (typeof data === 'string') {
            setMarkdown(data);
            setToc([]);
        } else {
            setMarkdown(data.content || "");
            setToc(data.toc || []);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setMarkdown("# Erreur chargement cours");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen text-slate-500">Chargement du cours...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <header className="h-16 glass sticky top-0 z-10 flex items-center justify-between px-6 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
            <Link to="/dashboard" className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
                <ChevronLeft size={20} className="text-slate-600"/>
            </Link>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <FileText className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              {id ? id.replace('.md', '').replace('.json', '') : "DocScrap Editor"}
            </h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              Viewer
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
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95" onClick={handlePrint}>
            <Download size={18} />
            <span className="hidden sm:inline">Exporter</span>
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
                  <div className="flex-1 flex overflow-hidden">
                      {/* Main Content */}
                      <div className="flex-1 p-8 overflow-y-auto bg-white custom-scrollbar">
                        <article ref={componentRef} className="prose prose-slate prose-lg max-w-none prose-pre:bg-transparent prose-pre:p-0">
                          <ReactMarkdown
                            components={{
                              code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    {...props}
                                    children={String(children).replace(/\n$/, '')}
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                  />
                                ) : (
                                  <code {...props} className={className}>
                                    {children}
                                  </code>
                                )
                              }
                            }}
                          >
                            {markdown}
                          </ReactMarkdown>
                        </article>
                      </div>

                      {/* TOC Sidebar */}
                      {toc && toc.length > 0 && (
                          <div className="w-64 bg-slate-50 border-l border-slate-200 p-6 overflow-y-auto hidden xl:block">
                              <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                                  <List size={16} />
                                  Table des matières
                              </h3>
                              <nav className="space-y-1">
                                  {toc.map((item, index) => (
                                      <a 
                                          key={index}
                                          href={item.anchor}
                                          className={`block text-sm py-1.5 transition-colors ${
                                              item.level === 1 
                                                  ? "font-semibold text-slate-700 hover:text-indigo-600" 
                                                  : "pl-4 text-slate-500 hover:text-slate-900"
                                          }`}
                                      >
                                          {item.title}
                                      </a>
                                  ))}
                              </nav>
                          </div>
                      )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarkdownEditor;
