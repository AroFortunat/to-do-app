"use server"
import { createTaskModel } from "@/Models/Tache/$create"
import { Task } from "@/Models/Tache/$Type"

export const createTaskAction = async (tache: Task) => {
    console.log("Payload reçu par createTaskAction:", tache);
    try {
      const newTask = await createTaskModel(tache);
      return newTask;
    } catch (error) {
      console.error("Erreur dans createTaskAction:", error);
      throw error;
    }
  };
  