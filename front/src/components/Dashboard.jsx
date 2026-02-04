import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import { Plus, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import IconSidebar from "./IconSidebar";
import StatsBar from "./StatsBar";
import CourseCard from "./CourseCard";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--color-background)" }}
    >
      {/* Icon Sidebar */}
      <IconSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Mes Cours
              </h1>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Gérez votre bibliothèque de documentation
              </p>
            </div>

            <Link to="/create" aria-label="Create a new course">
              <Button
                className="font-bold rounded-xl transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-text-inverse)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <Plus className="w-5 h-5" />
                Nouveau Cours
              </Button>
            </Link>
          </div>

          {/* Stats Bar */}
          <StatsBar coursesCount={courses.length} />

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Rechercher un cours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text-primary)",
              }}
              aria-label="Search courses"
            />
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bento-card p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <Skeleton className="w-16 h-6 rounded" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="pt-4 border-t" style={{ borderColor: "var(--color-border-light)" }}>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div
              className="text-center py-20 rounded-3xl border-2 border-dashed"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "var(--color-accent)" }}
              >
                <Plus className="w-8 h-8" style={{ color: "var(--color-primary)" }} />
              </div>
              <p
                className="text-lg font-medium mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                {searchQuery ? "Aucun cours trouvé" : "Aucun cours pour le moment"}
              </p>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {searchQuery
                  ? "Essayez de modifier votre recherche"
                  : "Créez votre premier cours pour commencer"}
              </p>
              {!searchQuery && (
                <Link to="/create">
                  <Button
                    className="font-bold"
                    style={{
                      background: "var(--color-primary)",
                      color: "var(--color-text-inverse)",
                    }}
                  >
                    <Plus className="w-5 h-5" />
                    Créer un cours
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
