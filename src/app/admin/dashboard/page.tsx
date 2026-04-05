"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Users,
  UserCheck,
  Clock,
  TrendingUp,
  Download,
  Search,
  RefreshCw,
} from "lucide-react";
import Toast, { type ToastType } from "@/app/ui/toast";


interface Stats {
  total: number;
  checkedIn: number;
  pending: number;
  checkinRate: number;
  byRole: Record<string, number>;
  checkedInByRole: Record<string, number>;
}

interface Registration {
  id: string;
  name: string;
  email: string;
  githubUsername: string | null;
  ticketNumber: string;
  role: string;
  checkedIn: boolean;
  checkedInAt: string | null;
  createdAt: string;
}


const ROLE_LABELS: Record<string, string> = {
  community: "Community",
  speaker: "Ponente",
  organizer: "Organizador",
  staff: "Staff",
};

const ROLE_COLORS: Record<string, string> = {
  community: "bg-blue-500/20 text-blue-400",
  speaker: "bg-purple-500/20 text-purple-400",
  organizer: "bg-amber-500/20 text-amber-400",
  staff: "bg-emerald-500/20 text-emerald-400",
};


export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data: Stats = await res.json();
      setStats(data);
    } catch {
      setToast({ message: "Error al cargar estadisticas.", type: "error" });
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const fetchRegistrations = useCallback(
    async (s: string, role: string, status: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (s) params.set("search", s);
        if (role) params.set("role", role);
        if (status) params.set("status", status);

        const res = await fetch(
          `/api/admin/registrations?${params.toString()}`,
          { cache: "no-store" },
        );
        const data = (await res.json()) as {
          registrations: Registration[];
          total: number;
        };
        setRegistrations(data.registrations ?? []);
        setTotal(data.total ?? 0);
      } catch {
        setRegistrations([]);
        setTotal(0);
        setToast({ message: "Error al cargar registros.", type: "error" });
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchRegistrations("", "", "");
  }, [fetchRegistrations]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchStats(),
      fetchRegistrations(search, roleFilter, statusFilter),
    ]);
    setRefreshing(false);
    setToast({ message: "Datos actualizados.", type: "success" });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchRegistrations(value, roleFilter, statusFilter);
    }, 300);
  };

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
    fetchRegistrations(search, value, statusFilter);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    fetchRegistrations(search, roleFilter, value);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-60"
          title="Actualizar datos"
        >
          <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      {stats && (
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              icon={<Users size={20} />}
              label="Total registros"
              value={stats.total}
            />
            <StatCard
              icon={<UserCheck size={20} />}
              label="Check-ins"
              value={stats.checkedIn}
            />
            <StatCard
              icon={<Clock size={20} />}
              label="Pendientes"
              value={stats.pending}
            />
            <StatCard
              icon={<TrendingUp size={20} />}
              label="Tasa check-in"
              value={`${stats.checkinRate}%`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Object.entries(ROLE_LABELS).map(([role, label]) => (
              <div
                key={role}
                className="rounded-xl border border-slate-700 bg-slate-900 p-4"
              >
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-lg font-bold">
                  {stats.byRole?.[role] ?? 0}{" "}
                  <span className="text-sm font-normal text-slate-400">
                    / {stats.checkedInByRole?.[role] ?? 0} check-in
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Buscar por nombre, email o ticket..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2 pl-9 pr-3 text-sm outline-none focus:border-orange-400"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-orange-400"
          >
            <option value="">Todos los roles</option>
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-orange-400"
          >
            <option value="">Todos los estados</option>
            <option value="checked-in">Check-in realizado</option>
            <option value="pending">Pendiente</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => window.open("/api/admin/registrations/csv")}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold transition hover:bg-orange-600"
        >
          <Download size={16} />
          Exportar CSV
        </button>
      </div>

      <p className="mb-3 text-sm text-slate-400">
        {loading ? "Cargando..." : `${total} registro${total !== 1 ? "s" : ""}`}
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-700 bg-slate-900 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Email</th>
              <th className="hidden px-4 py-3 md:table-cell">Ticket</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Estado</th>
              <th className="hidden px-4 py-3 lg:table-cell">Fecha registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {registrations.map((reg) => (
              <tr
                key={reg.id}
                className="bg-slate-900/50 transition hover:bg-slate-800/50"
              >
                <td className="whitespace-nowrap px-4 py-3 font-medium">
                  {reg.name}
                </td>
                <td className="px-4 py-3 text-slate-300">{reg.email}</td>
                <td className="hidden whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-400 md:table-cell">
                  {reg.ticketNumber}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[reg.role] ?? "bg-slate-700 text-slate-300"}`}
                  >
                    {ROLE_LABELS[reg.role] ?? reg.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${reg.checkedIn ? "bg-emerald-400" : "bg-slate-500"}`}
                    />
                    <span className="text-xs">
                      {reg.checkedIn ? "Check-in" : "Pendiente"}
                    </span>
                  </span>
                </td>
                <td className="hidden whitespace-nowrap px-4 py-3 text-xs text-slate-400 lg:table-cell">
                  {new Date(reg.createdAt).toLocaleDateString("es-CO")}
                </td>
              </tr>
            ))}
            {!loading && registrations.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  No se encontraron registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}


function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="mb-1 text-slate-400">{icon}</div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
