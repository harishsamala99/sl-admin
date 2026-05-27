import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatDate(dateString) {
  if (!dateString) return "—";
  const str = dateString.slice(0, 10);
  const parts = str.split("-");
  if (parts.length === 3) {
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
  }
  return str;
}
export {
  cn as c,
  formatDate as f
};
