import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./router-msbZomiZ.mjs";
import { D as Dialog, h as DialogContent, j as DialogHeader, k as DialogTitle, I as Input, T as Textarea, i as DialogFooter, L as Label } from "./alert-dialog-KXR4Lr8Y.mjs";
import { B as Button } from "./button-CP0jB9BL.mjs";
import { R as Root2, V as Value, T as Trigger, I as Icon, P as Portal, C as Content2, f as Viewport, a as Item, b as ItemIndicator, c as ItemText, d as ScrollUpButton, S as ScrollDownButton, L as Label$1, e as Separator } from "../_libs/radix-ui__react-select.mjs";
import { c as cn } from "./utils-ltKqtutP.mjs";
import { o as LoaderCircle, g as ChevronDown, f as Check, j as ChevronUp } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, l as literalType, c as coerce } from "../_libs/zod.mjs";
const Select = Root2;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = Trigger.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = Label$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
    ]
  }
));
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = Separator.displayName;
const RIDE = ["pending", "confirmed", "completed", "cancelled"];
const PAY = ["unpaid", "paid", "partial", "refunded"];
const schema = objectType({
  customer_id: stringType().uuid("Pick a customer"),
  pickup_location: stringType().trim().min(1).max(200),
  dropoff_location: stringType().trim().min(1).max(200),
  booking_date: stringType().min(1),
  booking_time: stringType().min(1),
  chauffeur_assigned: stringType().trim().max(120).optional().or(literalType("")),
  vehicle: stringType().trim().max(80).optional().or(literalType("")),
  amount: coerce.number().min(0).max(1e6),
  notes: stringType().trim().max(2e3).optional().or(literalType(""))
});
function BookingForm({ open, onOpenChange, initial, defaultCustomerId, onSaved }) {
  const [customers, setCustomers] = reactExports.useState([]);
  const [busy, setBusy] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    customer_id: "",
    pickup_location: "",
    dropoff_location: "",
    booking_date: "",
    booking_time: "",
    chauffeur_assigned: "",
    vehicle: "",
    amount: "0",
    notes: "",
    ride_status: "pending",
    payment_status: "unpaid"
  });
  reactExports.useEffect(() => {
    if (!open) return;
    supabase.from("customers").select("id, full_name").order("full_name").then(({ data }) => {
      setCustomers(data ?? []);
    });
    if (initial) {
      setForm({
        customer_id: initial.customer_id,
        pickup_location: initial.pickup_location,
        dropoff_location: initial.dropoff_location,
        booking_date: initial.booking_date,
        booking_time: initial.booking_time,
        chauffeur_assigned: initial.chauffeur_assigned ?? "",
        vehicle: initial.vehicle ?? "",
        amount: String(initial.amount ?? 0),
        notes: initial.notes ?? "",
        ride_status: initial.ride_status,
        payment_status: initial.payment_status
      });
    } else {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      setForm((f) => ({
        ...f,
        customer_id: defaultCustomerId ?? "",
        pickup_location: "",
        dropoff_location: "",
        booking_date: today,
        booking_time: "12:00",
        chauffeur_assigned: "",
        vehicle: "",
        amount: "0",
        notes: "",
        ride_status: "pending",
        payment_status: "unpaid"
      }));
    }
  }, [open, initial, defaultCustomerId]);
  const submit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    const payload = {
      ...parsed.data,
      chauffeur_assigned: parsed.data.chauffeur_assigned || null,
      vehicle: parsed.data.vehicle || null,
      notes: parsed.data.notes || null,
      ride_status: form.ride_status,
      payment_status: form.payment_status
    };
    const res = initial ? await supabase.from("bookings").update(payload).eq("id", initial.id) : await supabase.from("bookings").insert(payload);
    setBusy(false);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success(initial ? "Booking updated" : "Booking created");
    onOpenChange(false);
    onSaved();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl luxury-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: initial ? "Edit Booking" : "New Booking" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Customer *", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.customer_id, onValueChange: (v) => setForm({ ...form, customer_id: v }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a customer" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: customers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.full_name }, c.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pickup Location *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.pickup_location, onChange: (e) => setForm({ ...form, pickup_location: e.target.value }), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Dropoff Location *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.dropoff_location, onChange: (e) => setForm({ ...form, dropoff_location: e.target.value }), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Booking Date *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.booking_date, onChange: (e) => setForm({ ...form, booking_date: e.target.value }), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Booking Time *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: form.booking_time, onChange: (e) => setForm({ ...form, booking_time: e.target.value }), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Chauffeur Assigned", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.chauffeur_assigned, onChange: (e) => setForm({ ...form, chauffeur_assigned: e.target.value }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Vehicle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.vehicle, onChange: (e) => setForm({ ...form, vehicle: e.target.value }), placeholder: "Mercedes S-Class" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Ride Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.ride_status, onValueChange: (v) => setForm({ ...form, ride_status: v }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: RIDE.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s }, s)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Payment Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.payment_status, onValueChange: (v) => setForm({ ...form, payment_status: v }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAY.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s }, s)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Amount (USD)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", min: "0", value: form.amount, onChange: (e) => setForm({ ...form, amount: e.target.value }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes", className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: form.notes, onChange: (e) => setForm({ ...form, notes: e.target.value }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "sm:col-span-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: busy, className: "gradient-gold text-primary-foreground border-0", children: [
          busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
          initial ? "Save changes" : "Create booking"
        ] })
      ] })
    ] })
  ] }) });
}
function Field({ label, children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 " + (className ?? ""), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
const RIDE_STATUS = RIDE;
const PAYMENT_STATUS = PAY;
export {
  BookingForm as B,
  PAYMENT_STATUS as P,
  RIDE_STATUS as R,
  Select as S,
  SelectContent as a,
  SelectItem as b,
  SelectTrigger as c,
  SelectValue as d
};
