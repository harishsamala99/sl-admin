import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./router-msbZomiZ.mjs";
import { I as Input, A as AlertDialog, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./alert-dialog-KXR4Lr8Y.mjs";
import { B as Button } from "./button-CP0jB9BL.mjs";
import { B as Badge } from "./badge-IeVz0e_7.mjs";
import { C as CustomerForm } from "./CustomerForm-B-T4HAu3.mjs";
import { d as downloadCsv, e as exportPdf } from "./csv-jmvoTv7V.mjs";
import { f as formatDate } from "./utils-ltKqtutP.mjs";
import { F as FileDown, n as FileText, t as Plus, S as Search, P as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/zod.mjs";
import "../_libs/tailwind-merge.mjs";
const PAGE_SIZE = 10;
function CustomersPage() {
  const [customers, setCustomers] = reactExports.useState([]);
  const [q, setQ] = reactExports.useState("");
  const [tagFilter, setTagFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(0);
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [confirmDel, setConfirmDel] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const load = async () => {
    setLoading(true);
    const {
      data,
      error
    } = await supabase.from("customers").select("*").order("created_at", {
      ascending: false
    });
    if (error) toast.error(error.message);
    setCustomers(data ?? []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const filtered = reactExports.useMemo(() => {
    const needle = q.trim().toLowerCase();
    return customers.filter((c) => {
      if (tagFilter !== "all" && !(c.tags ?? []).includes(tagFilter)) return false;
      if (!needle) return true;
      return [c.full_name, c.email, c.phone, c.company_name].some((v) => (v ?? "").toString().toLowerCase().includes(needle));
    });
  }, [customers, q, tagFilter]);
  const pageRows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  reactExports.useEffect(() => {
    setPage(0);
  }, [q, tagFilter]);
  const handleDelete = async () => {
    if (!confirmDel) return;
    const {
      error
    } = await supabase.from("customers").delete().eq("id", confirmDel.id);
    if (error) toast.error(error.message);
    else toast.success("Customer deleted");
    setConfirmDel(null);
    load();
  };
  const exportRows = filtered.map((c) => ({
    Name: c.full_name,
    Email: c.email ?? "",
    Phone: c.phone ?? "",
    Company: c.company_name ?? "",
    Vehicle: c.preferred_vehicle ?? "",
    Tags: (c.tags ?? []).join(", "),
    Created: formatDate(c.created_at)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-10 space-y-4 md:space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-2", children: "Clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display", children: "Customers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => downloadCsv("customers.csv", exportRows), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4 mr-2" }),
          " CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => exportPdf("Customers", exportRows), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-2" }),
          " PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setEditing(null);
          setOpen(true);
        }, className: "gradient-gold text-primary-foreground border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          " New Customer"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "luxury-card rounded-xl p-4 flex gap-3 flex-wrap items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0 md:min-w-[240px] w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by name, phone, email, or company…", className: "pl-10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap overflow-x-auto pb-1 md:pb-0 hide-scrollbar", children: ["all", "VIP", "Corporate", "Frequent"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTagFilter(t), className: "px-3 py-1.5 text-xs rounded-md border transition-colors " + (tagFilter === t ? "bg-gold-soft text-gold border-gold/40" : "border-border text-muted-foreground hover:text-foreground"), children: t }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "luxury-card rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3", children: "Company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3", children: "Tags" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-6 py-3", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-6 py-12 text-center text-muted-foreground", children: "Loading…" }) }),
          !loading && pageRows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-6 py-16 text-center text-muted-foreground", children: "No customers found. Try a different search or add one." }) }),
          pageRows.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 hover:bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customers/$id", params: {
              id: c.id
            }, className: "font-medium hover:text-gold transition-colors", children: c.full_name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: c.email ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: c.phone ?? "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3 text-muted-foreground", children: c.company_name ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap", children: (c.tags ?? []).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-gold-soft text-gold border-gold/40", children: t }, t)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
                setEditing(c);
                setOpen(true);
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => setConfirmDel(c), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] }, c.id))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-3 border-t border-border text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          filtered.length,
          " customer",
          filtered.length === 1 ? "" : "s"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", disabled: page === 0, onClick: () => setPage((p) => p - 1), children: "Prev" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Page ",
            page + 1,
            " / ",
            pageCount
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", disabled: page >= pageCount - 1, onClick: () => setPage((p) => p + 1), children: "Next" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerForm, { open, onOpenChange: setOpen, initial: editing, onSaved: load }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!confirmDel, onOpenChange: (o) => !o && setConfirmDel(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete customer?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "This permanently removes ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: confirmDel?.full_name }),
          " and all their bookings & notes."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-destructive text-destructive-foreground", children: "Delete" })
      ] })
    ] }) })
  ] });
}
export {
  CustomersPage as component
};
