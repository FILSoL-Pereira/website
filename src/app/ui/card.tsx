type CardProps = {
  number: number;
  title: string;
  description: string;
  variant?: "light" | "dark";
};

export default function Card({ number, title, description, variant = "light" }: CardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`shadow-md p-6 text-center hover:scale-105 active:scale-105 transition-transform duration-300 mask mask-hexagon w-64 h-64 ${
        isDark ? "bg-slate-800 border border-slate-700" : "bg-white"
      }`}
    >
      <div className={`text-5xl font-bold mb-2 ${isDark ? "text-amber-400" : "text-amber-600"}`}>
        {number}
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-amber-300" : "text-amber-500"}`}>
        {title}
      </h3>
      <p className={isDark ? "text-gray-400" : "text-gray-700"}>{description}</p>
    </div>
  );
}
