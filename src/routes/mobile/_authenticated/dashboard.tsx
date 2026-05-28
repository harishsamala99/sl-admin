import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Users,
  CarFront,
  Calendar as CalendarIcon,
  DollarSign,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { RideBadge, PayBadge } from "@/components/shared/StatusBadges";

export const Route = createFileRoute("/mobile/_authenticated/dashboard")({
  component: MobileDashboard,
});

type Stats = {
  totalCustomers: number;
  totalBookings: number;
  todaysRides: number;
  revenue: number;
};

type RecentBooking = {
  id: string;
  customer_id: string;
  pickup_location: string;
  dropoff_location: string;
  booking_date: string;
  booking_time: string;
  ride_status: string;
  payment_status: string;
  amount: number;
  customers: { full_name: string } | null;
};

function MobileDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentBooking[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    Promise.all([
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("booking_date", today),
      supabase.from("bookings").select("amount").eq("payment_status", "paid"),
      supabase
        .from("bookings")
        .select(
          "id,customer_id,pickup_location,dropoff_location,booking_date,booking_time,ride_status,payment_status,amount,customers(full_name)",
        )
        .order("created_at", { ascending: false })
        .limit(5),
    ])
      .then(([c, b, t, paid, rec]) => {
        const revenue = (paid.data ?? []).reduce((s, r) => s + Number(r.amount ?? 0), 0);
        setStats({
          totalCustomers: c.count ?? 0,
          totalBookings: b.count ?? 0,
          todaysRides: t.count ?? 0,
          revenue,
        });
        setRecent((rec.data as RecentBooking[]) ?? []);
      })
      .catch((error) => {
        console.error("Dashboard data fetch failed:", error);
      });
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn duration-500 pb-10 select-none">
      <header className="border-b border-border/10 pb-4">
        <h1 className="text-3xl font-display font-medium tracking-tight">Dashboard</h1>
        <p className="text-xs text-muted-foreground mt-1 font-medium">
          Your fleet overview in real-time.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3.5">
        <StatCard label="Customers" value={stats?.totalCustomers} icon={Users} />
        <StatCard label="Bookings" value={stats?.totalBookings} icon={CarFront} />
        <StatCard label="Today" value={stats?.todaysRides} icon={CalendarIcon} />
        <StatCard
          label="Revenue"
          value={
            stats
              ? `$${stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 0 })}`
              : undefined
          }
          icon={DollarSign}
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display flex items-center gap-2 font-medium">
            <TrendingUp className="h-4 w-4 text-gold animate-bounce duration-[2000ms]" /> Recent
          </h2>
          <Link
            to="/mobile/bookings"
            className="text-xs font-semibold uppercase tracking-wider text-gold hover:text-white px-3 py-1 rounded-full border border-gold/30 bg-gold-soft transition-all duration-300"
          >
            See all
          </Link>
        </div>

        <div className="space-y-3.5">
          {recent.length === 0 && (
            <div className="text-center p-8 luxury-card rounded-2xl">
              <p className="text-xs text-muted-foreground font-medium">No bookings logged yet.</p>
            </div>
          )}
          {recent.map((b) => (
            <div
              key={b.id}
              className="luxury-card p-5 rounded-2xl flex flex-col gap-4.5 active:scale-[0.98] transition-transform duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-display font-medium text-sm tracking-wide text-white">
                    {b.customers?.full_name ?? "—"}
                  </div>
                  <div className="text-[10px] text-muted-foreground/80 mt-1 font-semibold tracking-wider">
                    {b.booking_date} · {b.booking_time.slice(0, 5)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display font-semibold text-sm tracking-wide text-white">
                    ${Number(b.amount).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground font-medium tracking-wide flex items-center gap-1.5 truncate border-t border-border/10 pt-3">
                <span className="truncate max-w-[120px]">{b.pickup_location}</span>
                <span className="text-gold flex-shrink-0">→</span>
                <span className="truncate max-w-[120px]">{b.dropoff_location}</span>
              </div>

              <div className="flex items-center justify-between border-t border-border/10 pt-3.5">
                <div className="flex gap-2">
                  <RideBadge status={b.ride_status} />
                  <PayBadge status={b.payment_status} />
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string | undefined;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="luxury-card rounded-2xl p-4 flex flex-col justify-between min-h-[100px] active:scale-[0.97] transition-all">
      <div className="flex items-center justify-between">
        <div className="h-7 w-7 grid place-items-center rounded-lg bg-gold-soft border border-gold/15">
          <Icon className="h-4 w-4 text-gold" />
        </div>
        <div className="text-[9px] uppercase tracking-widest text-muted-foreground/80 font-bold">
          {label}
        </div>
      </div>
      <div className="mt-4 text-xl font-display font-semibold tracking-tight text-white">
        {value === undefined ? <Skeleton className="h-6 w-14 bg-white/5" /> : value}
      </div>
    </div>
  );
}
