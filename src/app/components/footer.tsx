import { Instagram, Github, CopyleftIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-amber-500 text-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-1 text-sm">
            <CopyleftIcon /> 2025 FLISoL Pereira - Licencia GNU GPLv3
            <a
              href="https://github.com/FILSoL-Pereira/website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline transition hover:text-white"
            >
              Ver codigo fuente
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <a
            href="https://instagram.com/flisolpereira"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 hover:bg-white transition rounded-full p-2 bg-gray-800 text-white"
          >
            <Instagram />
          </a>
          <a
            href="https://github.com/FILSoL-Pereira"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 hover:bg-white transition rounded-full p-2 bg-gray-800 text-white"
          >
            <Github />
          </a>
        </div>
      </div>
    </footer>
  );
}
