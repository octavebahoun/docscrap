import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import CourseGenerator from "./components/CourseGenerator";
import MarkdownEditor from "./components/markdown";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CourseGenerator />} />
        <Route path="/course/:id" element={<MarkdownEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
