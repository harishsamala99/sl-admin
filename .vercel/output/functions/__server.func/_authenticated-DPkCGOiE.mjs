import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { O as Outlet, f as useRouterState, L as Link } from "./_libs/tanstack__react-router.mjs";
import { c as cn } from "./_ssr/utils-ltKqtutP.mjs";
import { b as bgVideo } from "./_ssr/bg-lWdYwwni.mjs";
import { m as Crown, L as LayoutDashboard, x as Users, e as CarFront, c as CalendarDays } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Bookings", url: "/bookings", icon: CarFront },
  { title: "Calendar", url: "/calendar", icon: CalendarDays }
];
function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url) => path === url || path.startsWith(url + "/");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 shrink-0 hidden md:flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 flex items-center gap-3 border-b border-sidebar-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-md gradient-gold grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base leading-tight", children: "Superior Limousine LLC" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.25em] text-gold mt-1", children: "Executive Transportation" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-3 space-y-1", children: items.map((it) => {
      const active = isActive(it.url);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: it.url,
          className: cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all",
            active ? "bg-gold-soft text-gold border border-gold/30" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it.title })
          ]
        },
        it.url
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-sidebar-border text-[10px] uppercase tracking-[0.25em] text-sidebar-foreground/50", children: "Admin Console · v1.0" })
  ] });
}
function MobileTopBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden bg-sidebar border-b border-sidebar-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: "Superior Limousine LLC" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-x-auto px-2 pb-2 gap-1", children: items.map((it) => {
      const active = path === it.url || path.startsWith(it.url + "/");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: it.url,
          className: cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs whitespace-nowrap",
            active ? "bg-gold-soft text-gold" : "text-sidebar-foreground/70"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-3.5 w-3.5" }),
            it.title
          ]
        },
        it.url
      );
    }) })
  ] });
}
function AuthLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen flex w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("video", { className: "fixed inset-0 w-full h-full object-cover -z-10 opacity-25 pointer-events-none", src: bgVideo, autoPlay: true, muted: true, loop: true, playsInline: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/70 to-background/90 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTopBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AuthLayout as component
};
