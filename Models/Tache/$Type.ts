import { z } from "zod";
import { PriorityType, statusType  } from "@prisma/client";

// Schéma de base pour les enum

const PriorityTypeSchema = z.nativeEnum(PriorityType);
const statusTypeSchema = z.nativeEnum(statusType)
export type statusTypeTask = z.infer<typeof statusTypeSchema>
export type PriorityTypeLevel = z.infer<typeof PriorityTypeSchema>
const TaskSchema = z.object({
  Title: z.string(),
  Description: z.string(),
  Priority: PriorityTypeSchema,
  status:statusTypeSchema.optional(),
  Author_id: z.string(),
  Assign_at: z.string(),
  Deadline: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;

