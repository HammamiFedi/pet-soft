"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomInput from "@/components/custom-input";
import CustomTextarea from "@/components/custom-textarea";
import { usePetContext } from "@/lib/hooks";
import { TPetForm } from "@/lib/types";
import { petFormSchema } from "@/lib/schemas";

import PetFormBtn from "./pet-form-btn";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: actionType === "edit" ? selectedPet : undefined,
    resolver: zodResolver(petFormSchema),
  });

  const handleSubmit = async () => {
    const isValid = await trigger();

    if (!isValid) return;

    // Function to close the form
    onFormSubmission();

    const petData: TPetForm = getValues();

    if (actionType === "edit") {
      await handleEditPet(selectedPet!.id, petData);
    } else {
      await handleAddPet(petData);
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <CustomInput
          id="name"
          type="text"
          label="Name"
          placeholder="Enter pet name"
          error={errors.name?.message}
          {...register("name")}
        />

        <CustomInput
          id="ownerName"
          type="text"
          label="Owner Name"
          placeholder="Enter pet owner name"
          error={errors.ownerName?.message}
          {...register("ownerName")}
        />

        <CustomInput
          id="imageUrl"
          type="text"
          label="Image URL"
          placeholder="Enter pet image URL"
          error={errors.imageUrl?.message}
          {...register("imageUrl")}
        />

        <CustomInput
          id="age"
          type="number"
          label="Age"
          placeholder="Enter pet age"
          error={errors.age?.message}
          {...register("age")}
        />

        <CustomTextarea
          id="notes"
          type="textarea"
          label="Notes"
          placeholder="Enter pet notes"
          rows={3}
          error={errors.notes?.message}
          {...register("notes")}
        />
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
