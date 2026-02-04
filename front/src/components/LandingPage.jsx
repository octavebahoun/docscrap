import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between pointer-events-none sm:pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-900">DocScrap</span>
        </div>
        <Link
          to="/dashboard"
          className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          Dashboard
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
            Transformez la doc <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              en savoir instantané.
            </span>
          </h1>

          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Transformez n'importe quelle documentation technique complexe en un
            cours structuré, clair et interactif grâce à l'IA.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/create"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-lg rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
            >
              Créer une zone de cours
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 font-lg rounded-2xl hover:bg-slate-50 hover:border-slate-300"
            >
              Voir mes cours
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-left">
          {[
            {
              icon: Zap,
              title: "Ultra Rapide",
              desc: "Scraping intelligent et conversion instantanée.",
            },
            {
              icon: BookOpen,
              title: "Format Cours",
              desc: "Markdown propre, table des matières et résumés.",
            },
            {
              icon: ArrowRight,
              title: "Export Facile",
              desc: "PDF, Markdown ou partage direct.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <item.icon className="w-8 h-8 text-indigo-500 mb-4" />
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
