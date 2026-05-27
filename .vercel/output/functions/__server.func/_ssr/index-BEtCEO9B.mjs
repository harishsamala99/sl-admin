import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./router-msbZomiZ.mjs";
import { I as Input, A as AlertDialog, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./alert-dialog-KXR4Lr8Y.mjs";
import { B as Button } from "./button-CP0jB9BL.mjs";
import { B as Badge } from "./badge-IeVz0e_7.mjs";
import { C as CustomerForm } from "./CustomerForm-B-T4HAu3.mjs";
import { t as Plus, S as Search, s as Phone, M as Mail, a as Building, P as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/zod.mjs";
function MobileCustomersPage() {
  const [customers, setCustomers] = reactExports.useState([]);
  const [q, setQ] = reactExports.useState("");
  const [tagFilter, setTagFilter] = reactExports.useState("all");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-fade-in pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold", children: "Customers" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", className: "h-10 w-10 rounded-full gradient-gold", onClick: () => {
        setEditing(null);
        setOpen(true);
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5 text-primary-foreground" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by name, phone, email…", className: "pl-10 h-12 bg-card border-border/50 rounded-xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 hide-scrollbar -mx-4 px-4 snap-x", children: ["all", "VIP", "Corporate", "Frequent"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTagFilter(t), className: "whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full border transition-colors snap-start " + (tagFilter === t ? "bg-gold-soft text-gold border-gold/40" : "bg-card border-border text-muted-foreground hover:text-foreground"), children: t }, t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-4", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 bg-muted/20 rounded-xl border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" }) }),
      !loading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 bg-muted/20 rounded-xl border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No customers found." }) }),
      filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 p-4 rounded-xl shadow-sm space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mobile/customers/$id", params: {
            id: c.id
          }, className: "font-semibold text-lg hover:text-gold transition-colors", children: c.full_name }),
          c.tags && c.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap mt-1.5", children: c.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-gold-soft text-gold border-gold/40 text-[10px] py-0", children: t }, t)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-sm", children: [
          c.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.phone })
          ] }),
          c.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.email })
          ] }),
          c.company_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.company_name })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/40 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mobile/customers/$id", params: {
            id: c.id
          }, className: "text-sm text-gold font-medium", children: "View details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", onClick: () => {
              setEditing(c);
              setOpen(true);
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full text-destructive", onClick: () => setConfirmDel(c), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] })
        ] })
      ] }, c.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerForm, { open, onOpenChange: setOpen, initial: editing, onSaved: load }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!confirmDel, onOpenChange: (o) => !o && setConfirmDel(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "w-[90vw] max-w-[400px] rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete customer?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "This permanently removes ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: confirmDel?.full_name }),
          " and all their bookings."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "flex flex-col sm:flex-row gap-2 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "w-full mt-0", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-destructive text-destructive-foreground w-full", children: "Delete" })
      ] })
    ] }) })
  ] });
}
export {
  MobileCustomersPage as component
};
