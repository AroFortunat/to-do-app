"server only";
import { prisma } from "@/lib/prisma";
import { Task } from "./$Type";

export const createTaskModel = async (taches: Task) => {
  console.log("Payload reçu dans createTaskModel :", taches);
  if (!taches || typeof taches !== "object") {
    throw new TypeError(
      "Le payload doit être un objet valide. Reçu : " + JSON.stringify(taches)
    );
  }
  try {
    const newTache = await prisma.task.create({
      data: {
        Title: taches.Title,
        Description: taches.Description ?? null,
        Priority: taches.Priority,
        Assign_at: taches.Assign_at,
        Deadline: taches.Deadline,
        Author_id: taches.Author_id,
      },
    });
    return newTache;
  } catch (error) {
    console.error("Erreur dans createTaskModel", error);
    throw error;
  }
};
