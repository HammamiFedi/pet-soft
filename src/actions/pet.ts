"use server";

import { revalidatePath } from "next/cache";

import { petFormSchema, petIdSchema } from "@/lib/schemas";
import { checkAuth, getPetById } from "@/lib/server-utils";
import prisma from "@/lib/db";

export async function addPet(petData: unknown) {
  // Authentication Check
  const session = await checkAuth();

  // Validate the pet data with the petFormSchema
  const validatedPet = petFormSchema.safeParse(petData);

  // If the pet data is invalid, return an error message
  if (!validatedPet.success) {
    return { message: "Invalid pet data" };
  }

  // If the pet data is valid, create a new pet
  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    revalidatePath("/private", "layout");
  } catch (error) {
    return { message: "Failed to add pet" };
  }
}

export const editPet = async (id: unknown, newPetData: unknown) => {
  // Authentication Check
  const session = await checkAuth();

  // Validate the pet data with the petFormSchema
  const validatedPet = petFormSchema.safeParse(newPetData);

  // Validate the pet ID
  const validatedId = petIdSchema.safeParse(id);

  // If the pet data or the petId is invalid, return an error message
  if (!validatedPet.success || !validatedId.success) {
    return { message: "Invalid pet data" };
  }

  // Authorization Check
  const pet = await getPetById(validatedId.data);

  if (!pet) {
    return { message: "Pet not found" };
  }

  if (pet.userId !== session.user.id) {
    return { message: "Unauthorized" };
  }

  // Database Mutation
  try {
    await prisma.pet.update({
      where: {
        id: validatedId.data,
      },
      data: validatedPet.data,
    });
    revalidatePath("/private", "layout");
  } catch (error) {
    return { message: "Failed to edit pet" };
  }
};

export const deletePet = async (id: unknown) => {
  // Authentication Check
  const session = await checkAuth();

  // Validate the pet ID
  const validatedId = petIdSchema.safeParse(id);

  // If the petId is invalid, return an error message
  if (!validatedId.success) {
    return { message: "Invalid pet ID" };
  }

  // Authorization Check
  const pet = await getPetById(validatedId.data);

  if (!pet) {
    return { message: "Pet not found" };
  }

  if (pet.userId !== session.user.id) {
    return { message: "Unauthorized" };
  }

  // Database Mutation
  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data,
      },
    });
  } catch (error) {
    return { message: "Failed to checkout pet" };
  }

  revalidatePath("/private", "layout");
};
