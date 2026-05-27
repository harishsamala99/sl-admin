import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as Route, s as supabase } from "./router-msbZomiZ.mjs";
import { f as formatDate } from "./utils-ltKqtutP.mjs";
import { B as Button } from "./button-CP0jB9BL.mjs";
import { B as Badge } from "./badge-IeVz0e_7.mjs";
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent } from "./tabs-Dd-J5PzG.mjs";
import { T as Textarea, A as AlertDialog, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./alert-dialog-KXR4Lr8Y.mjs";
import { C as CustomerForm } from "./CustomerForm-B-T4HAu3.mjs";
import { B as BookingForm } from "./BookingForm-BR6jE-nI.mjs";
import { R as RideBadge, P as PayBadge } from "./StatusBadges-lmD0uUgn.mjs";
import { A as ArrowLeft, P as Pencil, t as Plus, u as Send, n as FileText, T as Trash2, C as Calendar, D as DollarSign, k as CircleCheck, U as UserCheck, M as Mail, s as Phone, p as MapPin, b as Building2, d as Car, r as MessageSquare, l as CreditCard } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
function CustomerDetail() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = reactExports.useState(null);
  const [bookings, setBookings] = reactExports.useState([]);
  const [notes, setNotes] = reactExports.useState([]);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [bookOpen, setBookOpen] = reactExports.useState(false);
  const [editingBooking, setEditingBooking] = reactExports.useState(null);
  const [confirmDel, setConfirmDel] = reactExports.useState(false);
  const [newNote, setNewNote] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("history");
  const load = async () => {
    const [c, b, n] = await Promise.all([supabase.from("customers").select("*").eq("id", id).maybeSingle(), supabase.from("bookings").select("*").eq("customer_id", id).order("booking_date", {
      ascending: false
    }), supabase.from("customer_notes").select("*").eq("customer_id", id).order("created_at", {
      ascending: false
    })]);
    if (c.error || !c.data) {
      toast.error("Customer not found");
      navigate({
        to: "/customers"
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
  const upcoming = reactExports.useMemo(() => bookings.filter((b) => b.booking_date >= today && b.ride_status !== "cancelled" && b.ride_status !== "completed"), [bookings, today]);
  const completed = reactExports.useMemo(() => bookings.filter((b) => b.ride_status === "completed"), [bookings]);
  const totalTrips = bookings.length;
  const totalSpent = bookings.filter((b) => b.payment_status === "paid").reduce((s, b) => s + Number(b.amount ?? 0), 0);
  const lastRide = reactExports.useMemo(() => {
    const past = bookings.filter((b) => b.booking_date <= today).sort((a, b) => b.booking_date.localeCompare(a.booking_date))[0];
    return past?.booking_date ?? null;
  }, [bookings, today]);
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
      to: "/customers"
    });
  };
  const sendInvoice = () => {
    if (!customer?.email) {
      toast.error("No email on file for this customer");
      return;
    }
    const unpaid = bookings.filter((b) => b.payment_status !== "paid" && b.payment_status !== "refunded");
    const total = unpaid.reduce((s, b) => s + Number(b.amount ?? 0), 0);
    const lines = unpaid.length ? unpaid.map((b) => `• ${formatDate(b.booking_date)} ${b.pickup_location} → ${b.dropoff_location}  $${Number(b.amount).toFixed(2)}`).join("%0D%0A") : "All bookings are currently settled.";
    const subject = encodeURIComponent(`Superior Limousine LLC — Invoice for ${customer.full_name}`);
    const body = `Dear ${customer.full_name},%0D%0A%0D%0APlease find your invoice from Superior Limousine LLC Executive Transportation below.%0D%0A%0D%0A${lines}%0D%0A%0D%0AOutstanding total: $${total.toFixed(2)}%0D%0A%0D%0AThank you for choosing Superior Limousine LLC.`;
    window.location.href = `mailto:${customer.email}?subject=${subject}&body=${body}`;
  };
  if (!customer) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-muted-foreground", children: "Loading…" });
  }
  const status = customer.account_status ?? "active";
  const statusColor = {
    active: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    vip: "border-gold/50 text-gold bg-gold-soft",
    inactive: "border-muted-foreground/40 text-muted-foreground bg-muted/30",
    suspended: "border-rose-500/40 text-rose-300 bg-rose-500/10"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-10 space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-muted-foreground gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/customers", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to customers"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: "Superior Limousine LLC · Executive Transportation" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "luxury-card rounded-xl p-6 md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "Client Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display", children: customer.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize " + (statusColor[status] ?? statusColor.active), children: status }),
            (customer.tags ?? []).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-gold-soft text-gold border-gold/40", children: t }, t))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setEditOpen(true), variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4 mr-2" }),
            " Edit Customer"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
            setEditingBooking(null);
            setBookOpen(true);
          }, size: "sm", className: "gradient-gold text-primary-foreground border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            " Create Reservation"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: sendInvoice, variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 mr-2" }),
            " Send Invoice"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
            setActiveTab("history");
            document.getElementById("tabs-section")?.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }, variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-2" }),
            " View Ride History"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setConfirmDel(true), variant: "outline", size: "sm", className: "border-rose-500/40 text-rose-300 hover:bg-rose-500/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
            " Delete"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }), label: "Total Trips", value: totalTrips }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4" }), label: "Total Spent", value: `$${totalSpent.toLocaleString(void 0, {
          minimumFractionDigits: 2
        })}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }), label: "Last Ride", value: lastRide ? formatDate(lastRide) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4" }), label: "Client Since", value: formatDate(customer.created_at) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Contact", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-gold" }), label: "Email", value: customer.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-gold" }), label: "Phone", value: customer.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-gold" }), label: "Date of Birth", value: formatDate(customer.date_of_birth) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Addresses", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-gold" }), label: "Home", value: customer.home_address, multiline: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-gold" }), label: "Billing", value: customer.billing_address, multiline: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-gold" }), label: "Shipping", value: customer.shipping_address, multiline: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Account", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-gold" }), label: "Company", value: customer.company_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4 text-gold" }), label: "Status", value: status, capitalize: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-gold" }), label: customer.id_type || "ID", value: customer.id_number }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-gold" }), label: "Client Since", value: formatDate(customer.created_at) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Service Preferences", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4 text-gold" }), label: "Preferred Vehicle", value: customer.preferred_vehicle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4 text-gold" }), label: "Chauffeur", value: customer.chauffeur_preference }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-gold" }), label: "Special Requests", value: customer.notes, multiline: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Payment on File", className: "md:col-span-2 lg:col-span-2", children: [
        customer.card_last4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-gold" }), label: "Card", value: `${customer.card_brand ?? "Card"} •••• ${customer.card_last4}${customer.card_exp_month && customer.card_exp_year ? `   exp ${String(customer.card_exp_month).padStart(2, "0")}/${customer.card_exp_year}` : ""}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4 text-gold" }), label: "Cardholder", value: customer.card_holder_name })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No card on file." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-gold" }), label: "Billing Terms", value: customer.billing_details, multiline: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70 pt-2", children: "Only non-sensitive card metadata is stored. Full card numbers and CVVs are never retained." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Upcoming Bookings", className: "md:col-span-2 lg:col-span-3", children: upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No upcoming reservations." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: upcoming.slice(0, 4).map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between text-sm border-l-2 border-gold/40 pl-3 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
            formatDate(b.booking_date),
            " · ",
            b.booking_time?.slice(0, 5) ?? ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            b.pickup_location,
            " → ",
            b.dropoff_location
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RideBadge, { status: b.ride_status })
      ] }, b.id)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "tabs-section", className: "scroll-mt-4 md:scroll-mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-card border border-border flex overflow-x-auto hide-scrollbar justify-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "history", children: [
          "Ride History (",
          bookings.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "completed", children: [
          "Completed (",
          completed.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "notes", children: [
          "Notes (",
          notes.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "luxury-card rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingsTable, { bookings, onRowClick: (b) => {
        setEditingBooking(b);
        setBookOpen(true);
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "completed", className: "luxury-card rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingsTable, { bookings: completed, onRowClick: (b) => {
        setEditingBooking(b);
        setBookOpen(true);
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "notes", className: "luxury-card rounded-xl p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: newNote, onChange: (e) => setNewNote(e.target.value), placeholder: "Add a note about this customer…", rows: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: addNote, className: "gradient-gold text-primary-foreground border-0", children: "Add" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          notes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center py-6", children: "No notes yet." }),
          notes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 border-l-2 border-gold/40 pl-4 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-gold mt-1 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm whitespace-pre-wrap", children: n.body }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
                formatDate(n.created_at),
                " ",
                new Date(n.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              ] })
            ] })
          ] }, n.id))
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerForm, { open: editOpen, onOpenChange: setEditOpen, initial: customer, onSaved: load }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BookingForm, { open: bookOpen, onOpenChange: setBookOpen, initial: editingBooking, defaultCustomerId: id, onSaved: load }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmDel, onOpenChange: setConfirmDel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete customer?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "This permanently removes ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: customer.full_name }),
          " along with their bookings & notes."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-destructive text-destructive-foreground", children: "Delete" })
      ] })
    ] }) })
  ] });
}
function Stat({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "luxury-card rounded-md px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: icon }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl text-gold mt-1 truncate", children: value })
  ] });
}
function Section({
  title,
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "luxury-card rounded-xl p-5 " + (className ?? ""), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] uppercase tracking-[0.25em] text-gold mb-4", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children })
  ] });
}
function InfoRow({
  icon,
  label,
  value,
  capitalize,
  multiline
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
      value ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground " + (capitalize ? "capitalize " : "") + (multiline ? "whitespace-pre-wrap" : "break-words"), children: value }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground italic", children: "Not set" })
    ] })
  ] });
}
function BookingsTable({
  bookings,
  onRowClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-4 md:-mx-4 px-4 md:px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wider text-muted-foreground border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2", children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2", children: "Trip" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2", children: "Chauffeur" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2", children: "Payment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2", children: "Amount" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
      bookings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "text-center py-10 text-muted-foreground", children: "No bookings to show." }) }),
      bookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 cursor-pointer hover:bg-muted/30", onClick: () => onRowClick(b), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 whitespace-nowrap", children: [
          formatDate(b.booking_date),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: b.booking_time?.slice(0, 5) ?? "" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 text-muted-foreground", children: [
          b.pickup_location,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "→" }),
          " ",
          b.dropoff_location
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: b.chauffeur_assigned ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RideBadge, { status: b.ride_status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PayBadge, { status: b.payment_status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 text-right", children: [
          "$",
          Number(b.amount).toFixed(2)
        ] })
      ] }, b.id))
    ] })
  ] }) });
}
export {
  CustomerDetail as component
};
