import H1 from "@/components/H1";
import Logo from "@/components/logo";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-5">
      <div className="flex items-center gap-x-2">
        <Logo />
        <H1 className="text-3xl">PetSoft</H1>
      </div>
      <div className="w-[80%] md:w-[600px]">
        <div className="w-full space-y-4 rounded-xl bg-white px-8 py-12 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
