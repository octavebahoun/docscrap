import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Book,
  Calendar,
  ChevronRight,
  FileJson,
  FileText,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Mes Cours</h1>
            <p className="text-slate-500 mt-1">
              Gérez votre bibliothèque de documentation
            </p>
          </div>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            <Plus size={20} />
            Nouveau Cours
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Chargement...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500 mb-4">Aucun cours trouvé</p>
            <Link
              to="/create"
              className="text-indigo-600 font-bold hover:underline"
            >
              Commencez par en créer un
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                to={`/course/${course.id}`}
                key={course.id}
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${course.type === "json" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}
                  >
                    {course.type === "json" ? <FileJson /> : <FileText />}
                  </div>
                  <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                    {course.type.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                  {course.summary}
                </p>

                <div className="mt-auto pt-6 flex items-center justify-between text-sm text-slate-400 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>
                      {new Date(course.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
