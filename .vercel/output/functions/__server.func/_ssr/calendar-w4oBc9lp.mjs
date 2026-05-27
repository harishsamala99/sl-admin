import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./router-msbZomiZ.mjs";
import { B as Button } from "./button-CP0jB9BL.mjs";
import { R as RideBadge } from "./StatusBadges-lmD0uUgn.mjs";
import { f as formatDate } from "./utils-ltKqtutP.mjs";
import "../_libs/sonner.mjs";
import { h as ChevronLeft, i as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "./badge-IeVz0e_7.mjs";
import "../_libs/tailwind-merge.mjs";
function CalendarPage() {
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
  const grid = reactExports.useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startOffset = first.getDay();
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [cursor]);
  const byDate = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    bookings.forEach((b) => {
      const arr = map.get(b.booking_date) ?? [];
      arr.push(b);
      map.set(b.booking_date, arr);
    });
    return map;
  }, [bookings]);
  const monthLabel = cursor.toLocaleString(void 0, {
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-10 space-y-4 md:space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-2", children: "Schedule" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display", children: "Calendar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg w-44 text-center", children: monthLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "luxury-card rounded-xl p-4 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[700px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-px text-xs uppercase tracking-wider text-muted-foreground mb-2", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1", children: d }, d)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2", children: grid.map((d, i) => {
        const key = d ? d.toISOString().slice(0, 10) : `empty-${i}`;
        const dayBookings = d ? byDate.get(key) ?? [] : [];
        const today = d && (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) === key;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[100px] rounded-md border p-2 text-xs " + (d ? "bg-card border-border" : "bg-transparent border-transparent") + (today ? " ring-1 ring-gold" : ""), children: d && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mb-1 " + (today ? "text-gold" : "text-muted-foreground"), children: d.getDate() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            dayBookings.slice(0, 3).map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate bg-gold-soft border border-gold/20 rounded px-1.5 py-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-medium", children: b.booking_time?.slice(0, 5) ?? "" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: b.customers?.full_name ?? "—" })
            ] }, b.id)),
            dayBookings.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
              "+",
              dayBookings.length - 3,
              " more"
            ] })
          ] })
        ] }) }, key);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "luxury-card rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg mb-3", children: "All bookings this month" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm", children: [
        bookings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No bookings." }),
        bookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-2 py-1.5 hover:bg-muted/30 rounded-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gold w-32 text-xs shrink-0", children: [
            formatDate(b.booking_date),
            " ",
            b.booking_time?.slice(0, 5) ?? ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 truncate", children: [
            b.customers?.full_name,
            " — ",
            b.pickup_location,
            " → ",
            b.dropoff_location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RideBadge, { status: b.ride_status })
        ] }, b.id))
      ] })
    ] })
  ] });
}
export {
  CalendarPage as component
};
