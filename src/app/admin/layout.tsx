import AdminShell from "./components/AdminShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
