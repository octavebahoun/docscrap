import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  Plus,
  Settings,
  User,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/dashboard", icon: BookOpen },
  { name: "Create", href: "/create", icon: Plus },
  { name: "Settings", href: "#", icon: Settings },
];

export default function IconSidebar() {
  const location = useLocation();

  return (
    <aside
      className="w-16 border-r border-[var(--color-border-light)] bg-[var(--color-surface)] flex flex-col items-center py-4"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        to="/"
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-8 transition-all hover:scale-105"
        style={{
          background: "var(--color-primary)",
          boxShadow: "var(--shadow-sm)",
        }}
        aria-label="DocScrap Home"
      >
        <BookOpen className="w-6 h-6" style={{ color: "var(--color-text-inverse)" }} />
      </Link>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              className="group relative w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: isActive
                  ? "var(--color-accent)"
                  : "transparent",
                color: isActive
                  ? "var(--color-primary)"
                  : "var(--color-text-muted)",
              }}
              aria-label={item.name}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" />

              {/* Tooltip */}
              <span
                className="absolute left-full ml-2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
                style={{
                  background: "var(--color-primary-dark)",
                  color: "var(--color-text-inverse)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <button
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
        style={{
          background: "var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
        aria-label="User profile"
      >
        <User className="w-5 h-5" />
      </button>
    </aside>
  );
}
