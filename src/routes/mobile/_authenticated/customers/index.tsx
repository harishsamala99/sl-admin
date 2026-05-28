import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Phone, Mail, Building } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerForm } from "@/components/shared/CustomerForm";
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

type Customer = Database["public"]["Tables"]["customers"]["Row"];

export const Route = createFileRoute("/mobile/_authenticated/customers/")({
  component: MobileCustomersPage,
});

function MobileCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [confirmDel, setConfirmDel] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setCustomers(data ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return customers.filter((c) => {
      if (tagFilter !== "all" && !(c.tags ?? []).includes(tagFilter as never)) return false;
      if (!needle) return true;
      return [c.full_name, c.email, c.phone, c.company_name].some((v) =>
        (v ?? "").toString().toLowerCase().includes(needle),
      );
    });
  }, [customers, q, tagFilter]);

  const handleDelete = async () => {
    if (!confirmDel) return;
    const { error } = await supabase.from("customers").delete().eq("id", confirmDel.id);
    if (error) toast.error(error.message);
    else toast.success("Customer deleted");
    setConfirmDel(null);
    load();
  };

  return (
    <div className="space-y-4 animate-fade-in pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold">Customers</h1>
        </div>
        <Button
          size="icon"
          className="h-10 w-10 rounded-full gradient-gold"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-5 w-5 text-primary-foreground" />
        </Button>
      </header>

      <div className="relative">
        <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, phone, email…"
          className="pl-10 h-12 bg-card border-border/50 rounded-xl"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar -mx-4 px-4 snap-x">
        {["all", "VIP", "Corporate", "Frequent"].map((t) => (
          <button
            key={t}
            onClick={() => setTagFilter(t)}
            className={
              "whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full border transition-colors snap-start " +
              (tagFilter === t
                ? "bg-gold-soft text-gold border-gold/40"
                : "bg-card border-border text-muted-foreground hover:text-foreground")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3 mt-4">
        {loading && (
          <div className="text-center p-8 bg-muted/20 rounded-xl border border-border/50">
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center p-8 bg-muted/20 rounded-xl border border-border/50">
            <p className="text-sm text-muted-foreground">No customers found.</p>
          </div>
        )}
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate({ to: "/mobile/customers/$id", params: { id: c.id } })}
            className="luxury-card border border-gold/35 p-5 rounded-2xl shadow-[0_0_15px_rgba(200,168,0,0.02)] space-y-3 cursor-pointer hover:border-gold/60 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold text-lg hover:text-gold transition-colors text-foreground">
                  {c.full_name}
                </span>
                {c.tags && c.tags.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mt-1.5">
                    {c.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="bg-gold-soft text-gold border-gold/40 text-[10px] py-0 font-semibold"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              {c.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-foreground/90">{c.phone}</span>
                </div>
              )}
              {c.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <span className="truncate text-foreground/90">{c.email}</span>
                </div>
              )}
              {c.company_name && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="w-4 h-4 text-gold shrink-0" />
                  <span className="truncate text-foreground/90">{c.company_name}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/20 mt-3">
              <span className="text-sm text-gold font-semibold">
                View details
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-sidebar-accent/50 text-muted-foreground hover:text-gold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(c);
                    setOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDel(c);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CustomerForm open={open} onOpenChange={setOpen} initial={editing} onSaved={load} />

      <AlertDialog open={!!confirmDel} onOpenChange={(o) => !o && setConfirmDel(null)}>
        <AlertDialogContent className="w-[90vw] max-w-[400px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes <b>{confirmDel?.full_name}</b> and all their bookings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <AlertDialogCancel className="w-full mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground w-full"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
