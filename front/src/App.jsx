import "./App.css";
import MarkdownEditor from "./components/markdown";
import MarkdownLoader from "./components/fetchmarkdown";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <MarkdownEditor />
      {/* <MarkdownLoader /> */}
    </div>
  );
}

export default App;
