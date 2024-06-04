import "server-only";

import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { auth } from "@/lib/auth";

import prisma from "./db";

export async function checkAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getPetById(petId: string) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  return pet;
}

export async function getPetsByUserId(userId: string) {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });

  return pets;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
