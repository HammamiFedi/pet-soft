"use client";

import Image from "next/image";

import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function PetList() {
  const { pets, selectedPet, handleSelectPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) => {
    const query = searchQuery.toLowerCase();
    return pet.name.toLowerCase().includes(query);
  });

  return (
    <ul className="divide-y divide-solid border-b border-light bg-white">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            className={cn(
              "group flex h-[70px] w-full items-center gap-2 px-5 text-base transition hover:bg-focused focus:bg-focused",
              {
                "bg-focused": pet.id === selectedPet?.id,
              },
            )}
            onClick={() => handleSelectPetId(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="h-[45px] w-[45px] rounded-full object-cover transition group-hover:translate-x-2 group-focus:translate-x-0"
            />
            <p className="font-semibold transition group-hover:translate-x-2 group-focus:translate-x-0">
              {pet.name}
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
}
