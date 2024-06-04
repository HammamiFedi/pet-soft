"use client";

import { useTransition } from "react";

import { logout } from "@/actions/auth";

import { Button } from "./ui/button";

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <Button onClick={handleSignOut} disabled={isPending}>
      Sign Out
    </Button>
  );
}
