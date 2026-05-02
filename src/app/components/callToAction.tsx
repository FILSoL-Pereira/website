import Button from "../ui/button";

type CallToActionProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgColor?: string;
  className?: string;
  variant?: "light" | "dark";
};

export default function CallToAction({
  title,
  description,
  buttonText,
  buttonLink,
  bgColor = "bg-white",
  className,
  variant = "light",
}: CallToActionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={
        className ??
        `${isDark ? "bg-slate-950 border-t border-slate-800" : bgColor} py-16 px-6 text-center max-w-7xl mx-auto`
      }
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <h2
          className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </h2>
        <p
          className={`text-xl ${isDark ? "text-gray-400" : "text-gray-700"}`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Button
          bgColor={isDark ? "bg-amber-500" : "bg-amber-400"}
          txtColor={isDark ? "text-slate-950" : "text-black"}
          href={buttonLink}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
