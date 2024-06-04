"use client";

import { usePetContext } from "@/lib/hooks";

import PetDetailsTopBar from "./pet-details-topbar";
import PetDetailsInfo from "./pet-details-info";
import PetDetailsNotes from "./pet-details-notes";
import PetDetailsNoFound from "./pet-details-no-found";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  if (!selectedPet) return <PetDetailsNoFound />;

  return (
    <section className="flex h-full w-full flex-col">
      <PetDetailsTopBar
        imageUrl={selectedPet.imageUrl}
        name={selectedPet.name}
      />

      <PetDetailsInfo ownerName={selectedPet.ownerName} age={selectedPet.age} />

      <PetDetailsNotes notes={selectedPet.notes} />
    </section>
  );
}
