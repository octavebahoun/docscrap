import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SkipToContent from "./components/SkipToContent";

// Lazy load route components for better performance
const LandingPage = lazy(() => import("./components/LandingPage"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const CourseGenerator = lazy(() => import("./components/CourseGenerator"));
const MarkdownEditor = lazy(() => import("./components/markdown"));

// Loading fallback
function LoadingFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--color-background)" }}
    >
      <div className="text-center">
        <div
          className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
          style={{
            borderColor: "var(--color-border)",
            borderTopColor: "transparent",
          }}
        />
        <p style={{ color: "var(--color-text-muted)" }}>Chargement...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SkipToContent />
      <Suspense fallback={<LoadingFallback />}>
        <main id="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CourseGenerator />} />
            <Route path="/course/:id" element={<MarkdownEditor />} />
          </Routes>
        </main>
      </Suspense>
    </Router>
  );
}

export default App;
