"use client";

import { ReactNode, createContext, useOptimistic, useState } from "react";
import { Pet } from "@prisma/client";
import { toast } from "sonner";

import { addPet, deletePet, editPet } from "@/actions/pet";
import { TPetForm } from "@/lib/types";

// PetContextProvider Props
type PetContextProviderProps = {
  children: ReactNode;
  petList: Pet[];
};

// Context Type
type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleSelectPetId: (id: Pet["id"]) => void;
  handleAddPet: (pet: TPetForm) => Promise<void>;
  handleEditPet: (id: Pet["id"], pet: TPetForm) => Promise<void>;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
};

// Export Context
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  petList,
}: PetContextProviderProps) {
  // Declare Optimistic State
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    petList,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          // We are setting the id to a random string for optimistic updates
          // When the server action is successful, the path will be revalidated
          // And the id will be updated to the correct value
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((pet) =>
            pet.id === payload.id ? { ...payload.pet, id: payload.id } : pet,
          );
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    },
  );

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // Derived State
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleSelectPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleAddPet = async (pet: TPetForm) => {
    setOptimisticPets({ action: "add", payload: pet });

    const errors = await addPet(pet);

    if (errors) {
      toast.warning(errors.message);
      return;
    }

    toast.success("Pet added successfully");
  };

  const handleEditPet = async (id: Pet["id"], pet: TPetForm) => {
    setOptimisticPets({ action: "edit", payload: { id, pet } });

    const errors = await editPet(id, pet);

    if (errors) {
      toast.warning(errors.message);
      return;
    }

    toast.success("Pet updated successfully");
  };

  const handleCheckoutPet = async (id: Pet["id"]) => {
    setOptimisticPets({ action: "delete", payload: id });

    await deletePet(id);

    setSelectedPetId(null);

    toast.success("Pet checked out successfully");
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleSelectPetId,
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
