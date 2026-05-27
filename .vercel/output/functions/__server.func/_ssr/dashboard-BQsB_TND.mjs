import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./router-msbZomiZ.mjs";
import { S as Skeleton } from "./skeleton-CClICMv9.mjs";
import { R as RideBadge, P as PayBadge } from "./StatusBadges-lmD0uUgn.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/sonner.mjs";
import { m as Crown, x as Users, e as CarFront, C as Calendar, D as DollarSign, w as TrendingUp } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./utils-ltKqtutP.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./badge-IeVz0e_7.mjs";
import "../_libs/class-variance-authority.mjs";
function Dashboard() {
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
    }).limit(6)]).then(([c, b, t, paid, rec]) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-10 space-y-6 md:space-y-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "flex items-center justify-between flex-wrap gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" }),
        " Admin Dashboard"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-4xl font-display", children: [
        "Good evening, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-gold-text", children: "welcome back" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Your fleet at a glance." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Customers", value: stats?.totalCustomers, icon: Users }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Bookings", value: stats?.totalBookings, icon: CarFront }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Today's Rides", value: stats?.todaysRides, icon: Calendar }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Revenue (Paid)", value: stats ? `$${stats.revenue.toLocaleString(void 0, {
        minimumFractionDigits: 2
      })}` : void 0, icon: DollarSign })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "luxury-card rounded-xl p-4 md:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-gold" }),
            " Recent Bookings"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your latest 6 reservations." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bookings", className: "text-sm text-gold hover:underline", children: "View all →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wider text-muted-foreground border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3", children: "Trip" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3", children: "When" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3", children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-6 py-3", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          recent.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-6 py-12 text-center text-muted-foreground", children: "No bookings yet." }) }),
          recent.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 hover:bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3 font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customers/$id", params: {
              id: b.customer_id
            }, className: "hover:text-gold transition-colors", children: b.customers?.full_name ?? "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3 text-muted-foreground", children: [
              b.pickup_location,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "→" }),
              " ",
              b.dropoff_location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3 text-muted-foreground", children: [
              b.booking_date,
              " · ",
              b.booking_time.slice(0, 5)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RideBadge, { status: b.ride_status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PayBadge, { status: b.payment_status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3 text-right font-medium", children: [
              "$",
              Number(b.amount).toFixed(2)
            ] })
          ] }, b.id))
        ] })
      ] }) })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "luxury-card rounded-xl p-4 md:p-5 group hover:gold-glow transition-shadow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 grid place-items-center rounded-md bg-gold-soft border border-gold/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-display", children: value === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }) : value })
  ] });
}
export {
  Dashboard as component
};
