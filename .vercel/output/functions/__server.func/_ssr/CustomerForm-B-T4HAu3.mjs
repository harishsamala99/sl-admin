import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./router-msbZomiZ.mjs";
import { D as Dialog, h as DialogContent, j as DialogHeader, k as DialogTitle, I as Input, T as Textarea, i as DialogFooter, L as Label } from "./alert-dialog-KXR4Lr8Y.mjs";
import { B as Button } from "./button-CP0jB9BL.mjs";
import { B as Badge } from "./badge-IeVz0e_7.mjs";
import { v as ShieldAlert, o as LoaderCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, l as literalType, e as enumType } from "../_libs/zod.mjs";
const ALL_TAGS = ["VIP", "Corporate", "Frequent"];
const CURRENT_YEAR = (/* @__PURE__ */ new Date()).getFullYear();
const schema = objectType({
  full_name: stringType().trim().min(1, "Full name required").max(120),
  phone: stringType().trim().max(40).optional().or(literalType("")),
  email: stringType().trim().email("Invalid email").max(255).optional().or(literalType("")),
  date_of_birth: stringType().trim().optional().or(literalType("")),
  home_address: stringType().trim().max(300).optional().or(literalType("")),
  billing_address: stringType().trim().max(300).optional().or(literalType("")),
  shipping_address: stringType().trim().max(300).optional().or(literalType("")),
  company_name: stringType().trim().max(120).optional().or(literalType("")),
  preferred_vehicle: stringType().trim().max(80).optional().or(literalType("")),
  chauffeur_preference: stringType().trim().max(120).optional().or(literalType("")),
  billing_details: stringType().trim().max(500).optional().or(literalType("")),
  account_status: enumType(["active", "inactive", "vip", "suspended"]).default("active"),
  id_type: stringType().trim().max(40).optional().or(literalType("")),
  id_number: stringType().trim().max(60).optional().or(literalType("")),
  card_holder_name: stringType().trim().max(120).optional().or(literalType("")),
  card_brand: stringType().trim().max(20).optional().or(literalType("")),
  card_last4: stringType().trim().regex(/^\d{4}$/, "Must be 4 digits").optional().or(literalType("")),
  card_exp_month: stringType().trim().optional().or(literalType("")),
  card_exp_year: stringType().trim().optional().or(literalType("")),
  notes: stringType().trim().max(2e3).optional().or(literalType(""))
});
const EMPTY = {
  full_name: "",
  phone: "",
  email: "",
  date_of_birth: "",
  home_address: "",
  billing_address: "",
  shipping_address: "",
  company_name: "",
  preferred_vehicle: "",
  chauffeur_preference: "",
  billing_details: "",
  account_status: "active",
  id_type: "",
  id_number: "",
  card_holder_name: "",
  card_brand: "",
  card_last4: "",
  card_exp_month: "",
  card_exp_year: "",
  notes: ""
};
function CustomerForm({ open, onOpenChange, initial, onSaved }) {
  const [form, setForm] = reactExports.useState(EMPTY);
  const [tags, setTags] = reactExports.useState([]);
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open) return;
    const i = initial;
    setForm({
      full_name: i?.full_name ?? "",
      phone: i?.phone ?? "",
      email: i?.email ?? "",
      date_of_birth: i?.date_of_birth ?? "",
      home_address: i?.home_address ?? "",
      billing_address: i?.billing_address ?? "",
      shipping_address: i?.shipping_address ?? "",
      company_name: i?.company_name ?? "",
      preferred_vehicle: i?.preferred_vehicle ?? "",
      chauffeur_preference: i?.chauffeur_preference ?? "",
      billing_details: i?.billing_details ?? "",
      account_status: i?.account_status ?? "active",
      id_type: i?.id_type ?? "",
      id_number: i?.id_number ?? "",
      card_holder_name: i?.card_holder_name ?? "",
      card_brand: i?.card_brand ?? "",
      card_last4: i?.card_last4 ?? "",
      card_exp_month: i?.card_exp_month ? String(i.card_exp_month) : "",
      card_exp_year: i?.card_exp_year ? String(i.card_exp_year) : "",
      notes: i?.notes ?? ""
    });
    setTags(i?.tags ?? []);
  }, [open, initial]);
  const submit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const d = parsed.data;
    const expMonth = d.card_exp_month ? parseInt(d.card_exp_month, 10) : null;
    const expYear = d.card_exp_year ? parseInt(d.card_exp_year, 10) : null;
    if (expMonth !== null && (expMonth < 1 || expMonth > 12)) {
      toast.error("Card expiry month must be 1-12");
      return;
    }
    if (expYear !== null && (expYear < CURRENT_YEAR || expYear > 2100)) {
      toast.error(`Card expiry year must be ${CURRENT_YEAR} or later`);
      return;
    }
    setBusy(true);
    const payload = {
      full_name: d.full_name,
      phone: d.phone || null,
      email: d.email || null,
      date_of_birth: d.date_of_birth || null,
      home_address: d.home_address || null,
      billing_address: d.billing_address || null,
      shipping_address: d.shipping_address || null,
      company_name: d.company_name || null,
      preferred_vehicle: d.preferred_vehicle || null,
      chauffeur_preference: d.chauffeur_preference || null,
      billing_details: d.billing_details || null,
      account_status: d.account_status,
      id_type: d.id_type || null,
      id_number: d.id_number || null,
      card_holder_name: d.card_holder_name || null,
      card_brand: d.card_brand || null,
      card_last4: d.card_last4 || null,
      card_exp_month: expMonth,
      card_exp_year: expYear,
      notes: d.notes || null,
      tags
    };
    const res = initial ? await supabase.from("customers").update(payload).eq("id", initial.id) : await supabase.from("customers").insert(payload);
    setBusy(false);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success(initial ? "Customer updated" : "Customer added");
    onOpenChange(false);
    onSaved();
  };
  const toggleTag = (t) => setTags((curr) => curr.includes(t) ? curr.filter((x) => x !== t) : [...curr, t]);
  const copyHomeToBilling = () => setForm((f) => ({ ...f, billing_address: f.home_address }));
  const copyBillingToShipping = () => setForm((f) => ({ ...f, shipping_address: f.billing_address || f.home_address }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl luxury-card max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: initial ? "Edit Customer" : "New Customer" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-8 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Personal Details", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name *", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.full_name, onChange: (e) => setForm({ ...form, full_name: e.target.value }), required: true, maxLength: 120 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date of Birth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.date_of_birth, onChange: (e) => setForm({ ...form, date_of_birth: e.target.value }), max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Account Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: form.account_status,
            onChange: (e) => setForm({ ...form, account_status: e.target.value }),
            className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vip", children: "VIP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Inactive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suspended", children: "Suspended" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Contact Information", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone Number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.phone, onChange: (e) => setForm({ ...form, phone: e.target.value }), maxLength: 40 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email Address", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }), maxLength: 255 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.company_name, onChange: (e) => setForm({ ...form, company_name: e.target.value }), maxLength: 120 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Address Details", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Home Address", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.home_address, onChange: (e) => setForm({ ...form, home_address: e.target.value }), maxLength: 300 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Billing Address ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: copyHomeToBilling, className: "ml-2 text-[10px] uppercase text-gold hover:underline", children: "Same as home" })
        ] }), className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.billing_address, onChange: (e) => setForm({ ...form, billing_address: e.target.value }), maxLength: 300 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Shipping Address ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: copyBillingToShipping, className: "ml-2 text-[10px] uppercase text-gold hover:underline", children: "Same as billing" })
        ] }), className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.shipping_address, onChange: (e) => setForm({ ...form, shipping_address: e.target.value }), maxLength: 300 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Identification", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ID Type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: form.id_type,
            onChange: (e) => setForm({ ...form, id_type: e.target.value }),
            className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Passport", children: "Passport" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Driver License", children: "Driver License" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "National ID", children: "National ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Corporate Account", children: "Corporate Account" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ID / Account Number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.id_number, onChange: (e) => setForm({ ...form, id_number: e.target.value }), maxLength: 60 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Service Preferences", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Preferred Vehicle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.preferred_vehicle, onChange: (e) => setForm({ ...form, preferred_vehicle: e.target.value }), placeholder: "e.g. Mercedes S-Class", maxLength: 80 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Chauffeur Preferences", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.chauffeur_preference, onChange: (e) => setForm({ ...form, chauffeur_preference: e.target.value }), placeholder: "e.g. Marcus, English speaking", maxLength: 120 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tags", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ALL_TAGS.map((t) => {
          const active = tags.includes(t);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => toggleTag(t), className: "outline-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: active ? "bg-gold-soft text-gold border-gold/40" : "border-border text-muted-foreground", children: t }) }, t);
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Payment Information", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex gap-2 items-start text-xs bg-amber-500/10 border border-amber-500/30 text-amber-200 rounded-md p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "For PCI compliance, store ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "only" }),
            " non-sensitive card metadata here (brand, last 4 digits, expiry, cardholder name). Never enter the full card number or CVV."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cardholder Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.card_holder_name, onChange: (e) => setForm({ ...form, card_holder_name: e.target.value }), maxLength: 120 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Card Brand", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: form.card_brand,
            onChange: (e) => setForm({ ...form, card_brand: e.target.value }),
            className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Visa" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Mastercard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Amex" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Discover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Other" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Last 4 Digits", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.card_last4, onChange: (e) => setForm({ ...form, card_last4: e.target.value.replace(/\D/g, "").slice(0, 4) }), placeholder: "1234", inputMode: "numeric", maxLength: 4 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Expiry (MM / YYYY)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.card_exp_month, onChange: (e) => setForm({ ...form, card_exp_month: e.target.value.replace(/\D/g, "").slice(0, 2) }), placeholder: "MM", inputMode: "numeric", maxLength: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.card_exp_year, onChange: (e) => setForm({ ...form, card_exp_year: e.target.value.replace(/\D/g, "").slice(0, 4) }), placeholder: "YYYY", inputMode: "numeric", maxLength: 4 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Billing Notes / Invoicing Terms", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.billing_details, onChange: (e) => setForm({ ...form, billing_details: e.target.value }), placeholder: "e.g. Net-30 invoice to billing@acme.com", maxLength: 500 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormSection, { title: "Additional Notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes / Special Requests", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: form.notes, onChange: (e) => setForm({ ...form, notes: e.target.value }), maxLength: 2e3 }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: busy, className: "gradient-gold text-primary-foreground border-0", children: [
          busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
          initial ? "Save changes" : "Create customer"
        ] })
      ] })
    ] })
  ] }) });
}
function FormSection({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] uppercase tracking-[0.25em] text-gold border-b border-gold/20 pb-2", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children })
  ] });
}
function Field({ label, children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 " + (className ?? ""), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground flex items-center", children: label }),
    children
  ] });
}
export {
  CustomerForm as C
};
