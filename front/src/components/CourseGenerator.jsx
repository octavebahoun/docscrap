import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseGenerator() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // En vrai production, le backend devrait retourner l'ID du cours créé.
      // Ici on simule ou on attend que le backend stocke "last-fetched" ou quelque chose.
      // Pour l'instant, on va vers un cours "générique" ou on suppose que le backend a mis à jour "output/course.md"
      // Le backend post /url ne renvoie pas l'ID, mais on sait que ça génère.

      await axios.post("http://localhost:3000/api/courses/url", { url });

      // Redirection vers le dashboard après génération
      // Idéalement on redirigerait vers /course/nouvel-id
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de la génération. Vérifiez l'URL.", err);
      console.log(err, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Retour
        </Link>
      </div>

      <div className="w-full max-w-xl bg-white p-8 sm:p-12 rounded-3xl shadow-xl shadow-indigo-100 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Générateur de Cours
          </h1>
          <p className="text-slate-500">
            Entrez l'URL d'une documentation pour générer un cours complet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              URL de la documentation
            </label>
            <input
              type="url"
              required
              placeholder="https://react.dev/learn/..."
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Génération en cours...
              </>
            ) : (
              "Générer le cours"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
