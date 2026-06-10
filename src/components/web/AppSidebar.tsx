import { Link, useRouterState } from "@tanstack/react-router";
import { Crown, LayoutDashboard, Users, CalendarDays, CarFront, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Bookings", url: "/bookings", icon: CarFront },
  { title: "Calendar", url: "/calendar", icon: CalendarDays },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (url: string) => path === url || path.startsWith(url + "/");
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col bg-sidebar/40 backdrop-blur-xl text-sidebar-foreground border-r border-sidebar-border/40 select-none">
      <div className="px-6 py-8 flex items-center gap-3 border-b border-sidebar-border/20">
        <div className="h-10 w-10 rounded-lg gradient-gold grid place-items-center shadow-[0_0_20px_rgba(200,168,0,0.25)]">
          <Crown className="h-5 w-5 text-primary-foreground animate-pulse" />
        </div>
        <div>
          <div className="font-display font-medium text-sm tracking-wide leading-tight">
            Superior Limousine
          </div>
          <div className="text-[9px] uppercase tracking-[0.3em] text-gold mt-1 font-semibold opacity-90">
            Executive Admin
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {items.map((it) => {
          const active = isActive(it.url);
          return (
            <Link
              key={it.url}
              to={it.url}
              className={cn(
                "group relative flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium tracking-wide uppercase transition-all duration-300",
                active
                  ? "bg-gold-soft/80 text-gold border border-gold/20 shadow-[0_0_15px_rgba(200,168,0,0.1)]"
                  : "text-sidebar-foreground/60 border border-transparent hover:text-sidebar-foreground hover:bg-sidebar-accent/50 hover:border-sidebar-border/20",
              )}
            >
              {active && (
                <div className="absolute left-0 top-1/3 bottom-1/3 w-[3px] rounded-r bg-gold shadow-[0_0_8px_rgba(200,168,0,0.8)]" />
              )}
              <it.icon
                className={cn(
                  "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                  active
                    ? "text-gold"
                    : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/80",
                )}
              />
              <span>{it.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-sidebar-border/20 flex flex-col gap-3">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/80 border border-sidebar-border/40 bg-sidebar-accent/10 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 transition-all duration-300 shadow-sm"
          title="Switch Theme"
        >
          <span className="flex items-center gap-2">
            {theme === "dark" ? <Sun className="h-4 w-4 text-gold" /> : <Moon className="h-4 w-4 text-gold" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
          <span className="text-[8px] tracking-widest text-gold bg-gold-soft px-2 py-0.5 rounded-md border border-gold/20 font-bold">
            {theme.toUpperCase()}
          </span>
        </button>
        <div className="text-[9px] uppercase tracking-[0.25em] text-sidebar-foreground/40 font-semibold text-center mt-1">
          Admin Console · v2.0
        </div>
      </div>
    </aside>
  );
}

export function MobileTopBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="md:hidden bg-sidebar/55 backdrop-blur-xl border-b border-sidebar-border/30">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Crown className="h-5 w-5 text-gold animate-pulse" />
          <span className="font-display font-medium tracking-wide text-sm">Superior Limousine</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sidebar-border/40 bg-sidebar-accent/30 text-[9px] uppercase tracking-wider font-semibold text-sidebar-foreground/80 hover:text-sidebar-foreground transition-all duration-300"
            title="Switch Theme"
          >
            {theme === "dark" ? <Sun className="h-3.5 w-3.5 text-gold" /> : <Moon className="h-3.5 w-3.5 text-gold" />}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <span className="text-[8px] uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-xl border border-gold/30 bg-gold-soft text-gold font-bold">
            Admin
          </span>
        </div>
      </div>
      <div className="flex overflow-x-auto px-3 pb-3 gap-2 scrollbar-none">
        {items.map((it) => {
          const active = path === it.url || path.startsWith(it.url + "/");
          return (
            <Link
              key={it.url}
              to={it.url}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap border transition-all duration-300",
                active
                  ? "bg-gold-soft/80 text-gold border-gold/30"
                  : "text-sidebar-foreground/60 border-transparent bg-sidebar-accent/20",
              )}
            >
              <it.icon className="h-3.5 w-3.5" />
              {it.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
