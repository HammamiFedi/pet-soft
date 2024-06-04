import Image from "next/image";

import PetButton from "@/components/pet-button";
import { usePetContext } from "@/lib/hooks";

import PetDialog from "./pet-dialog";

type PetDetailsTopBarProps = {
  imageUrl: string;
  name: string;
};

export default function PetDetailsTopBar({
  imageUrl,
  name,
}: PetDetailsTopBarProps) {
  const { selectedPetId, handleCheckoutPet } = usePetContext();

  return (
    <div className="flex items-center border border-b border-light bg-white px-8 py-5">
      {/* Pet image and name */}
      <div className="flex items-center gap-x-4">
        <Image
          src={imageUrl}
          alt={name}
          width={75}
          height={75}
          className="h-[75px] w-[75px] rounded-full object-cover"
        />
        <h2 className="text-3xl font-semibold leading-7">{name}</h2>
      </div>

      {/* Edit and checkout buttons */}
      <div className="ml-auto space-x-2">
        <PetDialog actionType="edit">
          <PetButton actionType="edit">Edit</PetButton>
        </PetDialog>
        <PetButton
          actionType="checkout"
          onClick={async () => await handleCheckoutPet(selectedPetId!)}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}
