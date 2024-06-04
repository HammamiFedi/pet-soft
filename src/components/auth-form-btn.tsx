"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type AuthFormButtonProps = {
  type: "login" | "signup";
};

export default function AuthFormButton({ type }: AuthFormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full">
      {type === "login" ? "Log In" : "Sign Up"}
    </Button>
  );
}
