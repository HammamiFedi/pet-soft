"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { authFormSchema } from "@/lib/schemas";

export async function login(authData: unknown) {
  // Validate the form data
  const validatedAuthData = authFormSchema.safeParse(authData);

  // Return an error message if the form data is invalid
  if (!validatedAuthData.success) {
    return { message: "Invalid form data" };
  }

  // Call the signIn function
  // It takes three parameters, the first one is the type of the Provider (credentials, google, etc)
  // The second one is the data that we want to send
  // The third one is an option object
  try {
    await signIn("credentials", validatedAuthData.data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid Credentials",
          };
        default:
          return {
            message: "Could not log in. Please try later!",
          };
      }
    }

    throw error; // Next js redirects throw an error, so we need to throw it again
  }
}

export async function signup(authData: unknown) {
  // Validate the form data
  const validatedAuthData = authFormSchema.safeParse(authData);

  // Return an error message if the form data is invalid
  if (!validatedAuthData.success) {
    return { message: "Invalid form data" };
  }

  const { email, password } = validatedAuthData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    redirect("/login");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email is already taken" };
      }
    }
    return { message: "Failed to Signup" };
  }
}

export async function logout() {
  // Redirect the user to the Login page or Landing page after signing out
  await signOut({ redirectTo: "/" });
}
