import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, FileDown, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingForm, RIDE_STATUS, PAYMENT_STATUS } from "@/components/shared/BookingForm";
import { RideBadge, PayBadge } from "@/components/shared/StatusBadges";
import { formatDate } from "@/lib/utils";
import { downloadCsv } from "@/lib/csv";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Database } from "@/integrations/supabase/types";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"] & {
  customers: { full_name: string } | null;
};

const PAGE_SIZE = 12;

export const Route = createFileRoute("/_web/_authenticated/bookings")({
  component: BookingsPage,
});

function BookingsPage() {
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [q, setQ] = useState("");
  const [ride, setRide] = useState("all");
  const [pay, setPay] = useState("all");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BookingRow | null>(null);
  const [confirmDel, setConfirmDel] = useState<BookingRow | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, customers(full_name)")
      .order("booking_date", { ascending: false })
      .order("booking_time", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as BookingRow[]) ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((b) => {
      if (ride !== "all" && b.ride_status !== ride) return false;
      if (pay !== "all" && b.payment_status !== pay) return false;
      if (!needle) return true;
      return [
        b.customers?.full_name,
        b.pickup_location,
        b.dropoff_location,
        b.chauffeur_assigned,
      ].some((v) => (v ?? "").toString().toLowerCase().includes(needle));
    });
  }, [rows, q, ride, pay]);

  useEffect(() => {
    setPage(0);
  }, [q, ride, pay]);
  const pageRows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const del = async () => {
    if (!confirmDel) return;
    const { error } = await supabase.from("bookings").delete().eq("id", confirmDel.id);
    if (error) toast.error(error.message);
    else toast.success("Booking deleted");
    setConfirmDel(null);
    load();
  };

  const exportRows = filtered.map((b) => ({
    Customer: b.customers?.full_name ?? "",
    Date: b.booking_date,
    Time: b.booking_time,
    Pickup: b.pickup_location,
    Dropoff: b.dropoff_location,
    Chauffeur: b.chauffeur_assigned ?? "",
    Vehicle: b.vehicle ?? "",
    Status: b.ride_status,
    Payment: b.payment_status,
    Amount: b.amount,
  }));

  return (
    <div className="p-6 md:p-12 space-y-8 md:space-y-10 max-w-7xl mx-auto select-none animate-fadeIn duration-700">
      <div className="flex items-center justify-between flex-wrap gap-6 border-b border-border/10 pb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2 font-semibold">
            Reservations Console
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight">Bookings</h1>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => downloadCsv("bookings.csv", exportRows)}
            className="border-border/30 hover:bg-white/[0.04] transition-all text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl"
          >
            <FileDown className="h-4 w-4 mr-2 text-gold" /> Export CSV
          </Button>
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="gradient-gold text-primary-foreground border-0 font-semibold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(200,168,0,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="h-4 w-4 mr-2" /> New Booking
          </Button>
        </div>
      </div>

      <div className="luxury-card rounded-2xl p-6 flex gap-4 flex-wrap items-center">
        <div className="relative flex-1 min-w-0 md:min-w-[280px] w-full">
          <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search passenger, chauffeur, route..."
            className="pl-12 bg-white/[0.02] border-border/30 rounded-xl py-5 text-sm transition-all focus:border-gold/50 focus:ring-1 focus:ring-gold/50"
          />
        </div>
        <Select value={ride} onValueChange={setRide}>
          <SelectTrigger className="w-[180px] bg-white/[0.02] border-border/30 rounded-xl py-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40">
            <SelectItem value="all" className="text-xs uppercase tracking-wider font-medium">
              All Statuses
            </SelectItem>
            {RIDE_STATUS.map((s) => (
              <SelectItem key={s} value={s} className="capitalize text-xs font-medium">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={pay} onValueChange={setPay}>
          <SelectTrigger className="w-[180px] bg-white/[0.02] border-border/30 rounded-xl py-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40">
            <SelectItem value="all" className="text-xs uppercase tracking-wider font-medium">
              All Payments
            </SelectItem>
            {PAYMENT_STATUS.map((s) => (
              <SelectItem key={s} value={s} className="capitalize text-xs font-medium">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="luxury-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-widest text-muted-foreground/60 border-b border-border/20 bg-white/[0.01]">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Customer</th>
                <th className="text-left px-6 py-4 font-semibold">When</th>
                <th className="text-left px-6 py-4 font-semibold">Trip</th>
                <th className="text-left px-6 py-4 font-semibold">Chauffeur</th>
                <th className="text-left px-6 py-4 font-semibold">Ride</th>
                <th className="text-left px-6 py-4 font-semibold">Payment</th>
                <th className="text-right px-6 py-4 font-semibold">Amount</th>
                <th className="text-right px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-20 text-center text-muted-foreground tracking-wide text-xs"
                  >
                    No matching reservations found.
                  </td>
                </tr>
              )}
              {pageRows.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-border/10 hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    <Link
                      to="/customers/$id"
                      params={{ id: b.customer_id }}
                      className="hover:text-gold transition-colors text-sm font-display tracking-wide font-medium"
                    >
                      {b.customers?.full_name ?? "—"}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap font-medium tracking-wide">
                    {formatDate(b.booking_date)} <span className="text-border/40 mx-1">·</span>{" "}
                    {b.booking_time?.slice(0, 5) ?? ""}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium tracking-wide">
                    {b.pickup_location} <span className="text-gold font-normal mx-1">→</span>{" "}
                    {b.dropoff_location}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap tracking-wide">
                    {b.chauffeur_assigned ?? "—"}
                  </td>
                  <td className="px-6 py-4">
                    <RideBadge status={b.ride_status} />
                  </td>
                  <td className="px-6 py-4">
                    <PayBadge status={b.payment_status} />
                  </td>
                  <td className="px-6 py-4 text-right font-display text-sm font-semibold tracking-wide">
                    ${Number(b.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditing(b);
                        setOpen(true);
                      }}
                      className="hover:text-gold hover:bg-white/[0.04] rounded-lg mr-1"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setConfirmDel(b)}
                      className="hover:text-destructive hover:bg-white/[0.04] rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-8 py-5 border-t border-border/20 text-xs text-muted-foreground/80 bg-white/[0.01]">
          <div className="font-medium">{filtered.length} total bookings</div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="border-border/30 rounded-lg text-[10px] font-semibold uppercase tracking-wider px-3"
            >
              Prev
            </Button>
            <span className="font-semibold text-xs tracking-wider text-muted-foreground">
              Page {page + 1} / {pageCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pageCount - 1}
              onClick={() => setPage((p) => p + 1)}
              className="border-border/30 rounded-lg text-[10px] font-semibold uppercase tracking-wider px-3"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <BookingForm open={open} onOpenChange={setOpen} initial={editing} onSaved={load} />
      <AlertDialog open={!!confirmDel} onOpenChange={(o) => !o && setConfirmDel(null)}>
        <AlertDialogContent className="bg-background/95 backdrop-blur-xl border-border/40 max-w-sm rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display font-medium text-lg text-white">
              Delete Booking?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground/80 mt-2">
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex gap-2">
            <AlertDialogCancel className="border-border/30 rounded-xl text-xs uppercase font-semibold tracking-wider">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={del}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl text-xs uppercase font-semibold tracking-wider"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
