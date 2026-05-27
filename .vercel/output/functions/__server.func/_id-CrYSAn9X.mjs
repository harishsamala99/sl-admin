import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { d as useNavigate, L as Link } from "./_libs/tanstack__react-router.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { R as Route$1, s as supabase } from "./_ssr/router-msbZomiZ.mjs";
import { f as formatDate } from "./_ssr/utils-ltKqtutP.mjs";
import { B as Button } from "./_ssr/button-CP0jB9BL.mjs";
import { B as Badge } from "./_ssr/badge-IeVz0e_7.mjs";
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent } from "./_ssr/tabs-Dd-J5PzG.mjs";
import { T as Textarea, A as AlertDialog, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-KXR4Lr8Y.mjs";
import { C as CustomerForm } from "./_ssr/CustomerForm-B-T4HAu3.mjs";
import { B as BookingForm } from "./_ssr/BookingForm-BR6jE-nI.mjs";
import { R as RideBadge, P as PayBadge } from "./_ssr/StatusBadges-lmD0uUgn.mjs";
import { A as ArrowLeft, P as Pencil, t as Plus, s as Phone, M as Mail, p as MapPin, b as Building2, d as Car, l as CreditCard, T as Trash2 } from "./_libs/lucide-react.mjs";
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
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-tabs.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-roving-focus.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-alert-dialog.mjs";
import "./_libs/zod.mjs";
import "./_libs/radix-ui__react-select.mjs";
import "./_libs/radix-ui__number.mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
function MobileCustomerDetail() {
  const {
    id
  } = Route$1.useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = reactExports.useState(null);
  const [bookings, setBookings] = reactExports.useState([]);
  const [notes, setNotes] = reactExports.useState([]);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [bookOpen, setBookOpen] = reactExports.useState(false);
  const [editingBooking, setEditingBooking] = reactExports.useState(null);
  const [confirmDel, setConfirmDel] = reactExports.useState(false);
  const [newNote, setNewNote] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("info");
  const load = async () => {
    const [c, b, n] = await Promise.all([supabase.from("customers").select("*").eq("id", id).maybeSingle(), supabase.from("bookings").select("*").eq("customer_id", id).order("booking_date", {
      ascending: false
    }), supabase.from("customer_notes").select("*").eq("customer_id", id).order("created_at", {
      ascending: false
    })]);
    if (c.error || !c.data) {
      toast.error("Customer not found");
      navigate({
        to: "/mobile/customers"
      });
      return;
    }
    setCustomer(c.data);
    setBookings(b.data ?? []);
    setNotes(n.data ?? []);
  };
  reactExports.useEffect(() => {
    load();
  }, [id]);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  reactExports.useMemo(() => bookings.filter((b) => b.booking_date >= today && b.ride_status !== "cancelled" && b.ride_status !== "completed"), [bookings, today]);
  const totalTrips = bookings.length;
  const totalSpent = bookings.filter((b) => b.payment_status === "paid").reduce((s, b) => s + Number(b.amount ?? 0), 0);
  const addNote = async () => {
    if (!newNote.trim()) return;
    const {
      error
    } = await supabase.from("customer_notes").insert({
      customer_id: id,
      body: newNote.trim()
    });
    if (error) return toast.error(error.message);
    setNewNote("");
    toast.success("Note added");
    load();
  };
  const handleDelete = async () => {
    const {
      error
    } = await supabase.from("customers").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Customer deleted");
    navigate({
      to: "/mobile/customers"
    });
  };
  if (!customer) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-muted-foreground animate-pulse", children: "Loading…" });
  }
  const status = customer.account_status ?? "active";
  const statusColor = {
    active: "border-emerald-500/40 text-emerald-500 bg-emerald-500/10",
    vip: "border-gold/50 text-gold bg-gold-soft",
    inactive: "border-muted-foreground/40 text-muted-foreground bg-muted/30",
    suspended: "border-rose-500/40 text-rose-500 bg-rose-500/10"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-fade-in pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/mobile/customers", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground p-1 -ml-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 rounded-xl p-5 shadow-sm space-y-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -z-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold", children: customer.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `capitalize font-medium ${statusColor[status] ?? statusColor.active}`, children: status }),
          (customer.tags ?? []).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-gold/10 text-gold border-gold/40 font-medium", children: t }, t))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 pt-2 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setEditOpen(true), variant: "outline", className: "w-full bg-background/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4 mr-2" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setEditingBooking(null);
          setBookOpen(true);
        }, className: "w-full gradient-gold text-primary-foreground border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          " Book"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-2 border-t border-border/40 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Total Trips" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: totalTrips })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Total Spent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-gold", children: [
            "$",
            totalSpent.toLocaleString(void 0, {
              minimumFractionDigits: 0
            })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-3 bg-muted/30 border border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "info", children: "Info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "history", children: "History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "notes", children: "Notes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "info", className: "space-y-4 mt-4 animate-in fade-in slide-in-from-bottom-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 rounded-xl p-4 space-y-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gold uppercase tracking-wider", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-all", children: customer.phone || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-all", children: customer.email || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-pre-wrap leading-relaxed", children: customer.home_address || "—" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 rounded-xl p-4 space-y-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gold uppercase tracking-wider", children: "Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Company" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: customer.company_name || "—" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Vehicle Preference" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: customer.preferred_vehicle || "—" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Payment on File" }),
                customer.card_last4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  customer.card_brand ?? "Card",
                  " •••• ",
                  customer.card_last4
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground italic", children: "None" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full text-destructive border-destructive/30 hover:bg-destructive/10", onClick: () => setConfirmDel(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
          " Delete Customer"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "space-y-3 mt-4 animate-in fade-in slide-in-from-bottom-2", children: bookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 bg-muted/20 rounded-xl border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No ride history." }) }) : bookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => {
        setEditingBooking(b);
        setBookOpen(true);
      }, className: "bg-card border border-border/50 p-4 rounded-xl shadow-sm space-y-3 active:scale-[0.98] transition-transform", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: formatDate(b.booking_date) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: b.booking_time?.slice(0, 5) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-right", children: [
            "$",
            Number(b.amount).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 bg-muted/30 p-2.5 rounded-lg text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-gold mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: b.pickup_location })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: b.dropoff_location })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RideBadge, { status: b.ride_status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PayBadge, { status: b.payment_status })
        ] })
      ] }, b.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "notes", className: "space-y-4 mt-4 animate-in fade-in slide-in-from-bottom-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: newNote, onChange: (e) => setNewNote(e.target.value), placeholder: "Add a note…", rows: 2, className: "resize-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: addNote, className: "h-auto gradient-gold text-primary-foreground border-0 px-3", children: "Add" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          notes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center py-6", children: "No notes yet." }),
          notes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 p-3.5 rounded-xl shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm whitespace-pre-wrap", children: n.body }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-2 font-medium", children: [
              formatDate(n.created_at),
              " at ",
              new Date(n.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })
            ] })
          ] }, n.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerForm, { open: editOpen, onOpenChange: setEditOpen, initial: customer, onSaved: load }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BookingForm, { open: bookOpen, onOpenChange: setBookOpen, initial: editingBooking, defaultCustomerId: id, onSaved: load }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmDel, onOpenChange: setConfirmDel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "w-[90vw] max-w-[400px] rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete customer?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This permanently removes this customer and all their bookings." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "flex flex-col sm:flex-row gap-2 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "w-full mt-0", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-destructive text-destructive-foreground w-full", children: "Delete" })
      ] })
    ] }) })
  ] });
}
export {
  MobileCustomerDetail as component
};
