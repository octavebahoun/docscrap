import { Link } from "react-router-dom";
import { FileJson, FileText, Calendar, ChevronRight } from "lucide-react";
import { memo } from "react";

function CourseCard({ course }) {
  const Icon = course.type === "json" ? FileJson : FileText;

  return (
    <Link
      to={`/course/${course.id}`}
      className="group bento-card p-6 flex flex-col h-full"
      style={{ boxShadow: "var(--shadow-xs)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
          style={{
            background: course.type === "json" 
              ? "rgba(251, 191, 36, 0.1)" 
              : "rgba(45, 104, 196, 0.1)",
            color: course.type === "json" 
              ? "#f59e0b" 
              : "var(--color-primary)",
          }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <span
          className="label-text px-2 py-1 rounded"
          style={{ background: "var(--color-background)" }}
        >
          {course.type.toUpperCase()}
        </span>
      </div>

      <h3
        className="font-bold text-lg mb-2 line-clamp-2 leading-tight transition-colors group-hover:text-[var(--color-primary)]"
        style={{ color: "var(--color-text-primary)" }}
      >
        {course.title}
      </h3>

      <p
        className="text-sm mb-4 line-clamp-3 flex-1"
        style={{ color: "var(--color-text-muted)" }}
      >
        {course.summary}
      </p>

      <div
        className="pt-4 flex items-center justify-between text-sm border-t"
        style={{
          borderColor: "var(--color-border-light)",
          color: "var(--color-text-muted)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span className="text-xs">
            {new Date(course.updatedAt).toLocaleDateString("fr-FR")}
          </span>
        </div>
        <ChevronRight
          className="w-5 h-5 transition-transform group-hover:translate-x-1"
          style={{ color: "var(--color-primary)" }}
        />
      </div>
    </Link>
  );
}

export default memo(CourseCard);
