import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { O as Outlet, u as useLocation, L as Link } from "./_libs/tanstack__react-router.mjs";
import { c as cn } from "./_ssr/utils-ltKqtutP.mjs";
import { u as useAuth } from "./_ssr/router-msbZomiZ.mjs";
import { b as bgVideo } from "./_ssr/bg-lWdYwwni.mjs";
import "./_libs/sonner.mjs";
import { q as Menu, H as House, B as Briefcase, C as Calendar, x as Users } from "./_libs/lucide-react.mjs";
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
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
const navItems = [
  { icon: House, label: "Dashboard", href: "/mobile/dashboard" },
  { icon: Briefcase, label: "Bookings", href: "/mobile/bookings" },
  { icon: Calendar, label: "Calendar", href: "/mobile/calendar" },
  { icon: Users, label: "Customers", href: "/mobile/customers" }
];
function BottomNav() {
  const location = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center justify-around h-16 pb-safe", children: navItems.map((item) => {
    const isActive = location.pathname.startsWith(item.href);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: item.href,
        className: cn(
          "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium", children: item.label })
        ]
      },
      item.href
    );
  }) }) });
}
function MobileHeader({ title }) {
  const { user } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-14 px-4 pt-safe", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-6 h-6 text-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold truncate max-w-[200px]", children: title || "Superior Limousine LLC" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: user && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary", children: user.email?.charAt(0).toUpperCase() || "U" }) })
  ] }) });
}
function MobileLayout({
  children,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen flex flex-col w-full overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        className: "fixed inset-0 w-full h-full object-cover -z-10 opacity-15 pointer-events-none",
        src: bgVideo,
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/80 to-background/95 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileHeader, { title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto w-full pb-20 pt-4 px-4 scroll-smooth", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
function MobileAuthLayout() {
  useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
export {
  MobileAuthLayout as component
};
