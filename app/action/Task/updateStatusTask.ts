"use server"

import { updateStatusModel } from "@/Models/Tache/$updateStatus"

export const updateStatusAction = async (idTask:string)=>{
    if (!idTask) return console.error("id du taches Champ manquant ")
    const statusUpdate = await updateStatusModel(idTask)
    return statusUpdate
}