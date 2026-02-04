import { TrendingUp, Clock, BookOpen } from "lucide-react";

const stats = [
  {
    label: "Total Courses",
    value: "12",
    icon: BookOpen,
    trend: "+3 this week",
  },
  {
    label: "Time Saved",
    value: "24h",
    icon: Clock,
    trend: "vs manual reading",
  },
  {
    label: "Growth",
    value: "+32%",
    icon: TrendingUp,
    trend: "from last month",
  },
];

export default function StatsBar({ coursesCount = 12 }) {
  const statsWithData = stats.map((stat) =>
    stat.label === "Total Courses" ? { ...stat, value: coursesCount.toString() } : stat
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {statsWithData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bento-card p-5"
            style={{ boxShadow: "var(--shadow-xs)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-primary)",
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className="label-text text-xs px-2 py-1 rounded"
                style={{
                  background: "var(--color-background)",
                  color: "var(--color-text-muted)",
                }}
              >
                {stat.trend}
              </span>
            </div>

            <div className="space-y-1">
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {stat.value}
              </div>
              <div className="label-text">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
