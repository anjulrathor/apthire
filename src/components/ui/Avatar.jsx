"use client";
import Image from "next/image";
import { useMemo } from "react";

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

export default function Avatar({ name, image, size = "md", className = "" }) {
  // Deterministic color based on name
  const bgColor = useMemo(() => {
    if (!name) return "bg-gray-600";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }, [name]);

  const initials = useMemo(() => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, [name]);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-3xl",
  };

  if (image) {
    return (
      <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
        <Image src={image} alt={name || "Avatar"} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white shadow-inner ${bgColor} ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
}
