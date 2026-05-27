import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./router-msbZomiZ.mjs";
import { B as Button } from "./button-CP0jB9BL.mjs";
import { R as RideBadge } from "./StatusBadges-lmD0uUgn.mjs";
import "../_libs/sonner.mjs";
import { h as ChevronLeft, C as Calendar, i as ChevronRight, p as MapPin } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-ltKqtutP.mjs";
import "../_libs/tailwind-merge.mjs";
import "./badge-IeVz0e_7.mjs";
function MobileCalendarPage() {
  const [cursor, setCursor] = reactExports.useState(() => {
    const d = /* @__PURE__ */ new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [bookings, setBookings] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    const fmt = (d) => d.toISOString().slice(0, 10);
    supabase.from("bookings").select("id, booking_date, booking_time, pickup_location, dropoff_location, ride_status, customers(full_name)").gte("booking_date", fmt(start)).lte("booking_date", fmt(end)).order("booking_time").then(({
      data
    }) => setBookings(data ?? []));
  }, [cursor]);
  const byDate = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    bookings.forEach((b) => {
      const arr = map.get(b.booking_date) ?? [];
      arr.push(b);
      map.set(b.booking_date, arr);
    });
    return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
  }, [bookings]);
  const monthLabel = cursor.toLocaleString(void 0, {
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-fade-in pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold", children: "Schedule" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 rounded-xl p-3 shadow-sm flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-semibold text-lg flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-gold" }),
        monthLabel
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 mt-4", children: byDate.size === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 bg-muted/20 rounded-xl border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No bookings this month." }) }) : Array.from(byDate.entries()).map(([dateStr, dayBookings]) => {
      const dateObj = /* @__PURE__ */ new Date(dateStr + "T00:00:00");
      const dayName = dateObj.toLocaleDateString(void 0, {
        weekday: "short"
      });
      const dayNum = dateObj.getDate();
      const isToday = dateStr === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 sticky top-14 bg-background/95 py-2 backdrop-blur z-10 border-b border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xl font-bold ${isToday ? "text-gold" : ""}`, children: dayNum }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-medium ${isToday ? "text-gold/80" : "text-muted-foreground uppercase tracking-wider"}`, children: dayName }),
          isToday && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full uppercase font-bold tracking-widest", children: "Today" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: dayBookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 p-3.5 rounded-xl shadow-sm space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-gold", children: b.booking_time?.slice(0, 5) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-base mt-0.5", children: b.customers?.full_name ?? "Unknown" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RideBadge, { status: b.ride_status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-2 text-xs flex flex-col gap-1.5 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: b.pickup_location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: b.dropoff_location })
            ] })
          ] })
        ] }, b.id)) })
      ] }, dateStr);
    }) })
  ] });
}
export {
  MobileCalendarPage as component
};
