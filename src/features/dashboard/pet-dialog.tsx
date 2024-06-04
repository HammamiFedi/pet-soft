"use client";

import { ReactNode, useState } from "react";
import { flushSync } from "react-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PetForm from "./pet-form";

type PetDialogProps = {
  actionType: "add" | "edit";
  children: ReactNode;
};

export default function PetDialog({ children, actionType }: PetDialogProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new Pet" : "Edit a Pet"}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmission={() => flushSync(() => setIsFormOpen(false))}
        />
      </DialogContent>
    </Dialog>
  );
}
