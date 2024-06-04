"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import Logo from "@/components/logo";
import { cn } from "@/lib/utils";

const headerRoutes = [
  { label: "Dashboard", href: "/private/dashboard" },
  { label: "Account", href: "/private/account" },
];

export default function AppHeader() {
  const activePathname = usePathname();
  return (
    <header className="flex items-center justify-between border-b border-white/10 py-2">
      <Logo />

      <nav>
        <ul className="flex gap-2 text-xs">
          {headerRoutes.map((route) => (
            <li key={route.href}>
              <Link
                className={cn(
                  "rounded-sm px-2 py-1 text-white/70 transition hover:text-white focus:text-white",
                  {
                    "bg-black/10 text-white": activePathname === route.href,
                  },
                )}
                href={route.href}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
