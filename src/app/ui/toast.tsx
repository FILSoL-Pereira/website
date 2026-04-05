"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export type ToastType = "error" | "success" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const STYLES: Record<ToastType, string> = {
  error: "border-red-500/50 bg-red-950/90 text-red-200",
  success: "border-emerald-500/50 bg-emerald-950/90 text-emerald-200",
  info: "border-blue-500/50 bg-blue-950/90 text-blue-200",
};

const ICON_STYLES: Record<ToastType, string> = {
  error: "text-red-400",
  success: "text-emerald-400",
  info: "text-blue-400",
};

export default function Toast({
  message,
  type = "error",
  duration = 5000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ${
        STYLES[type]
      } ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className={`shrink-0 rounded-lg p-1 transition hover:bg-white/10 ${ICON_STYLES[type]}`}
      >
        <X size={16} />
      </button>
    </div>
  );
}
