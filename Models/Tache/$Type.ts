import { z } from "zod";
import { PriorityType  } from "@prisma/client";

// Schéma de base pour les enum

const PriorityTypeSchema = z.nativeEnum(PriorityType);
export type PriorityTypeLevel = z.infer<typeof PriorityTypeSchema>
const TaskSchema = z.object({
  Title: z.string(),
  Description: z.string(),
  Priority: PriorityTypeSchema,
  Author_id: z.string(),
  Assign_at: z.string(),
  Deadline: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;

