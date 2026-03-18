import { notFound } from "next/navigation";
import Registry from "../../components/registry";

const VALID_ROLES = ["community", "speaker", "organizer", "staff"] as const;
type Role = (typeof VALID_ROLES)[number];

type Props = {
  params: Promise<{ role: string }>;
};

export default async function RegisterByRole({ params }: Props) {
  const { role: rawRole } = await params;
  const role = rawRole.toLowerCase() as Role;

  if (!VALID_ROLES.includes(role)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cover bg-radial-[at_50%_10%] from-sky-900 via-slate-900 to-gray-950 to-80% pt-4">
      <Registry role={role} />
    </main>
  );
}
