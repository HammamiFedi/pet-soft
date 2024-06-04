"use client";

import { ReactNode } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "./ui/button";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export default function PetButton({
  children,
  actionType,
  disabled,
  onClick,
}: PetButtonProps) {
  if (actionType === "add") {
    return (
      <Button size="icon" disabled={disabled} onClick={onClick}>
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }

  if (actionType === "edit") {
    return (
      <Button variant="secondary" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Button variant="destructive" disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
}
