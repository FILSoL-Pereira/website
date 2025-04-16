import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
};

export default function Button({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="bg-white text-black px-6 py-3 rounded-full text-base sm:text-lg font-semibold active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white transition"
    >
      {children}
    </Link>
  );
}
