"use server"

import { deleteTaskModel } from "@/Models/Tache/$delete"

export const deleteTaskAction = async (idTask:string)=>{
    if (!idTask) return console.error("id du taches Champ manquant ")
    const deleteT = await deleteTaskModel(idTask)
    return deleteT
}