import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./router-msbZomiZ.mjs";
import { S as Skeleton } from "./skeleton-CClICMv9.mjs";
import { R as RideBadge, P as PayBadge } from "./StatusBadges-lmD0uUgn.mjs";
import "../_libs/sonner.mjs";
import { x as Users, e as CarFront, C as Calendar, D as DollarSign, w as TrendingUp, i as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./utils-ltKqtutP.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./badge-IeVz0e_7.mjs";
import "../_libs/class-variance-authority.mjs";
function MobileDashboard() {
  const [stats, setStats] = reactExports.useState(null);
  const [recent, setRecent] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    Promise.all([supabase.from("customers").select("id", {
      count: "exact",
      head: true
    }), supabase.from("bookings").select("id", {
      count: "exact",
      head: true
    }), supabase.from("bookings").select("id", {
      count: "exact",
      head: true
    }).eq("booking_date", today), supabase.from("bookings").select("amount").eq("payment_status", "paid"), supabase.from("bookings").select("id,customer_id,pickup_location,dropoff_location,booking_date,booking_time,ride_status,payment_status,amount,customers(full_name)").order("created_at", {
      ascending: false
    }).limit(5)]).then(([c, b, t, paid, rec]) => {
      const revenue = (paid.data ?? []).reduce((s, r) => s + Number(r.amount ?? 0), 0);
      setStats({
        totalCustomers: c.count ?? 0,
        totalBookings: b.count ?? 0,
        todaysRides: t.count ?? 0,
        revenue
      });
      setRecent(rec.data ?? []);
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your fleet overview." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Customers", value: stats?.totalCustomers, icon: Users }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Bookings", value: stats?.totalBookings, icon: CarFront }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Today", value: stats?.todaysRides, icon: Calendar }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Revenue", value: stats ? `$${stats.revenue.toLocaleString(void 0, {
        minimumFractionDigits: 0
      })}` : void 0, icon: DollarSign })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-display flex items-center gap-2 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-gold" }),
          " Recent"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mobile/bookings", className: "text-xs text-gold", children: "See all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        recent.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-6 bg-muted/20 rounded-xl border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No bookings yet." }) }),
        recent.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 p-4 rounded-xl shadow-sm flex flex-col gap-3 active:scale-[0.98] transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: b.customers?.full_name ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                b.booking_date,
                " · ",
                b.booking_time.slice(0, 5)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-sm", children: [
              "$",
              Number(b.amount).toFixed(2)
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground truncate flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[120px]", children: b.pickup_location }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold flex-shrink-0", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[120px]", children: b.dropoff_location })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RideBadge, { status: b.ride_status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PayBadge, { status: b.payment_status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
          ] })
        ] }, b.id))
      ] })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 rounded-xl p-3 shadow-sm flex flex-col justify-between min-h-[90px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xl font-display font-semibold", children: value === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-12" }) : value })
  ] });
}
export {
  MobileDashboard as component
};
