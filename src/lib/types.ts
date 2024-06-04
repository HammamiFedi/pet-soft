import { z } from "zod";
import { Pet } from "@prisma/client";

import { authFormSchema, petFormSchema } from "./schemas";

export type TPetForm = z.infer<typeof petFormSchema>;

export type TAuthForm = z.infer<typeof authFormSchema>;
