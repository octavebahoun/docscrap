import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  Eye,
  FileText,
  Download,
  Settings,
  ChevronLeft,
  List,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link, useParams } from "react-router-dom";
import api from "../lib/api";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const tabs = [
  { id: "edit", icon: Edit3, label: "Éditer" },
  { id: "both", icon: Settings, label: "Split" },
  { id: "preview", icon: Eye, label: "Aperçu" },
];

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
        const response = await api.get(`/api/courses/${id}`);
        const data = response.data;

        if (typeof data === "string") {
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

  if (loading)
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ color: "var(--color-text-muted)" }}
      >
        Chargement du cours...
      </div>
    );

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ background: "var(--color-background)" }}
    >
      {/* Header */}
      <header
        className="h-16 sticky top-0 z-10 flex items-center justify-between px-6 border-b glass"
        style={{ borderColor: "var(--color-border-light)" }}
      >
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 -ml-2 hover:bg-accent rounded-full transition-colors"
            aria-label="Return to dashboard"
          >
            <ChevronLeft
              className="w-5 h-5"
              style={{ color: "var(--color-text-secondary)" }}
            />
          </Link>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "var(--color-primary)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <FileText
              className="w-6 h-6"
              style={{ color: "var(--color-text-inverse)" }}
            />
          </div>
          <div>
            <h1
              className="text-lg font-bold leading-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              {id
                ? id.replace(".md", "").replace(".json", "")
                : "DocScrap Editor"}
            </h1>
            <p className="label-text">Viewer</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          className="flex items-center gap-1 p-1 rounded-lg"
          style={{
            background: "var(--color-background)",
            border: `1px solid var(--color-border)`,
          }}
          role="tablist"
          aria-label="Editor view mode"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-200"
                style={{
                  background: isActive ? "var(--color-surface)" : "transparent",
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
                  boxShadow: isActive ? "var(--shadow-xs)" : "none",
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tab.id}-panel`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* TOC for Mobile */}
          {toc && toc.length > 0 && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                  aria-label="Open table of contents"
                >
                  <List className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <h3
                  className="font-bold mb-4 label-text"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  📋 Table des matières
                </h3>
                <nav className="space-y-1">
                  {toc.map((item, index) => (
                    <a
                      key={index}
                      href={item.anchor}
                      className={`block text-sm py-1.5 transition-colors hover:text-primary ${
                        item.level === 1 ? "font-semibold" : "pl-4"
                      }`}
                      style={{
                        color:
                          item.level === 1
                            ? "var(--color-text-primary)"
                            : "var(--color-text-muted)",
                      }}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Button
            onClick={handlePrint}
            className="font-bold"
            style={{
              background: "var(--color-primary-dark)",
              color: "var(--color-text-inverse)",
              boxShadow: "var(--shadow-sm)",
            }}
            aria-label="Export as PDF"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exporter</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto w-full flex-1 flex gap-6 min-h-0">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
            {/* Editor Section */}
            <AnimatePresence mode="wait">
              {(activeTab === "edit" || activeTab === "both") && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`flex flex-col rounded-2xl overflow-hidden bento-card ${
                    activeTab === "edit" ? "lg:col-span-2" : ""
                  }`}
                  id="edit-panel"
                  role="tabpanel"
                  aria-labelledby="edit-tab"
                  style={{ boxShadow: "var(--shadow-xs)" }}
                >
                  <textarea
                    className="flex-1 p-6 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                    style={{
                      background: "var(--color-surface)",
                      color: "var(--color-text-primary)",
                    }}
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Commencez à rédiger..."
                    spellCheck="false"
                    aria-label="Markdown editor"
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
                  className={`flex flex-col rounded-2xl overflow-hidden bento-card ${
                    activeTab === "preview" ? "lg:col-span-2" : ""
                  }`}
                  id="preview-panel"
                  role="tabpanel"
                  aria-labelledby="preview-tab"
                  style={{ boxShadow: "var(--shadow-xs)" }}
                >
                  <div
                    className="flex-1 p-8 overflow-y-auto"
                    style={{ background: "var(--color-surface)" }}
                  >
                    <article
                      ref={componentRef}
                      className="prose prose-slate prose-lg max-w-none prose-pre:bg-transparent prose-pre:p-0"
                    >
                      <ReactMarkdown
                        components={{
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            const match = /language-(\w+)/.exec(
                              className || "",
                            );
                            return !inline && match ? (
                              <SyntaxHighlighter
                                {...props}
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code {...props} className={className}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {markdown}
                      </ReactMarkdown>
                    </article>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TOC Sidebar for Desktop */}
          {toc && toc.length > 0 && (
            <aside
              className="hidden lg:block w-64 rounded-2xl overflow-hidden bento-card sticky top-24 h-fit max-h-[calc(100vh-8rem)]"
              style={{ boxShadow: "var(--shadow-xs)" }}
              aria-label="Table of contents"
            >
              <div className="p-6 overflow-y-auto max-h-full">
                <h3 className="flex items-center gap-2 font-bold mb-4 label-text">
                  <List className="w-4 h-4" />
                  Table des matières
                </h3>
                <nav className="space-y-1">
                  {toc.map((item, index) => (
                    <a
                      key={index}
                      href={item.anchor}
                      className={`block text-sm py-1.5 transition-colors hover:text-primary ${
                        item.level === 1 ? "font-semibold" : "pl-4"
                      }`}
                      style={{
                        color:
                          item.level === 1
                            ? "var(--color-text-primary)"
                            : "var(--color-text-muted)",
                      }}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
};

export default MarkdownEditor;
