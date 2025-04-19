import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  bgColor?: string;
  txtColor?: string 
};

export default function Button({ href, children, bgColor = 'bg-white', txtColor = 'text-black' }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${bgColor} ${txtColor} w-full sm:w-auto text-center px-6 py-3 rounded-full text-base sm:text-lg font-semibold active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white transition`}
    >
      {children}
    </Link>
  );
}
