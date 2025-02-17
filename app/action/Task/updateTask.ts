"use server"

import { Task } from "@/Models/Tache/$Type"
import { updateTaskModel } from "@/Models/Tache/$updateTask"

export const updateTaskAction = async (idTask:string , datatask :Task)=>{
    if (!idTask) return console.error("id du taches Champ manquant ")
    const statusUpdate = await updateTaskModel(idTask , datatask)
    return statusUpdate
}