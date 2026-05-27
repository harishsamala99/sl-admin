import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Badge } from "./badge-IeVz0e_7.mjs";
import { c as cn } from "./utils-ltKqtutP.mjs";
function RideBadge({ status }) {
  const map = {
    pending: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    confirmed: "border-sky-400/40 text-sky-300 bg-sky-400/10",
    completed: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    cancelled: "border-rose-500/40 text-rose-300 bg-rose-500/10"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cn("capitalize", map[status]), children: status });
}
function PayBadge({ status }) {
  const map = {
    paid: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    unpaid: "border-rose-500/40 text-rose-300 bg-rose-500/10",
    partial: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    refunded: "border-muted-foreground/40 text-muted-foreground bg-muted/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cn("capitalize", map[status]), children: status });
}
export {
  PayBadge as P,
  RideBadge as R
};
