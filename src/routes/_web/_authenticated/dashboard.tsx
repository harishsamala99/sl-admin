import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Users,
  CarFront,
  Calendar as CalendarIcon,
  DollarSign,
  TrendingUp,
  Crown,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { RideBadge, PayBadge } from "@/components/shared/StatusBadges";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_web/_authenticated/dashboard")({
  component: Dashboard,
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

function Dashboard() {
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
        .limit(6),
    ]).then(([c, b, t, paid, rec]) => {
      const revenue = (paid.data ?? []).reduce((s, r) => s + Number(r.amount ?? 0), 0);
      setStats({
        totalCustomers: c.count ?? 0,
        totalBookings: b.count ?? 0,
        todaysRides: t.count ?? 0,
        revenue,
      });
      setRecent((rec.data as RecentBooking[]) ?? []);
    });
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="p-6 md:p-12 space-y-8 md:space-y-12 max-w-7xl mx-auto select-none animate-fadeIn duration-700">
      <header className="flex items-center justify-between flex-wrap gap-6 border-b border-border/10 pb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2.5 flex items-center gap-2 font-semibold">
            <Crown className="h-3 w-3 animate-pulse" /> Admin Console
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight">
            {getGreeting()}, <span className="gradient-gold-text font-semibold">welcome back</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-2 tracking-wide font-medium">
            Monitoring your fleet and luxury reservations in real-time.
          </p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Customers" value={stats?.totalCustomers} icon={Users} />
        <StatCard label="Total Bookings" value={stats?.totalBookings} icon={CarFront} />
        <StatCard label="Today's Rides" value={stats?.todaysRides} icon={CalendarIcon} />
        <StatCard
          label="Revenue (Paid)"
          value={
            stats
              ? `$${stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
              : undefined
          }
          icon={DollarSign}
        />
      </div>

      <section className="luxury-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-display font-medium flex items-center gap-2.5">
              <TrendingUp className="h-5 w-5 text-gold animate-bounce duration-[2000ms]" /> Recent
              Bookings
            </h2>
            <p className="text-[11px] text-muted-foreground mt-1 tracking-wide font-medium">
              Overview of the latest 6 reservations.
            </p>
          </div>
          <Link
            to="/bookings"
            className="text-xs uppercase tracking-widest text-gold hover:text-white font-semibold transition-colors duration-300 border border-gold/30 rounded-full px-4 py-1.5 bg-gold-soft hover:bg-gold/20"
          >
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto -mx-6 md:-mx-8 px-6 md:px-8">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-widest text-muted-foreground/60 border-b border-border/20">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Customer</th>
                <th className="text-left px-6 py-4 font-semibold">Trip</th>
                <th className="text-left px-6 py-4 font-semibold">When</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-left px-6 py-4 font-semibold">Payment</th>
                <th className="text-right px-6 py-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-muted-foreground tracking-wide text-xs"
                  >
                    No bookings recorded.
                  </td>
                </tr>
              )}
              {recent.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-border/10 hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <td className="px-6 py-4.5 font-medium whitespace-nowrap">
                    <Link
                      to="/customers/$id"
                      params={{ id: b.customer_id }}
                      className="hover:text-gold transition-colors text-sm font-display tracking-wide"
                    >
                      {b.customers?.full_name ?? "—"}
                    </Link>
                  </td>
                  <td className="px-6 py-4.5 text-muted-foreground font-medium tracking-wide">
                    {b.pickup_location} <span className="text-gold font-normal mx-1">→</span>{" "}
                    {b.dropoff_location}
                  </td>
                  <td className="px-6 py-4.5 text-muted-foreground whitespace-nowrap font-medium tracking-wide">
                    {b.booking_date} <span className="text-border/40 mx-1">·</span>{" "}
                    {b.booking_time.slice(0, 5)}
                  </td>
                  <td className="px-6 py-4.5">
                    <RideBadge status={b.ride_status} />
                  </td>
                  <td className="px-6 py-4.5">
                    <PayBadge status={b.payment_status} />
                  </td>
                  <td className="px-6 py-4.5 text-right font-display text-sm font-semibold tracking-wide">
                    ${Number(b.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    <div className="luxury-card rounded-2xl p-6 group hover:translate-y-[-4px] duration-500">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-semibold">
          {label}
        </div>
        <div className="h-10 w-10 grid place-items-center rounded-xl bg-gold-soft border border-gold/15 group-hover:border-gold/30 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(200,168,0,0.2)]">
          <Icon className="h-5 w-5 text-gold group-hover:scale-110 transition-transform duration-500" />
        </div>
      </div>
      <div className="mt-6 text-3xl font-display font-medium tracking-tight">
        {value === undefined ? <Skeleton className="h-9 w-28 bg-white/5" /> : value}
      </div>
    </div>
  );
}
