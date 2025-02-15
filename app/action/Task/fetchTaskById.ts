"use server"

import { fetchAllTaskByAssignModel } from "@/Models/Tache/$fetchById"

export const fetchAllTaskByAssignAction = async (userEmail:string) =>{
        const fetch = await fetchAllTaskByAssignModel(userEmail)
        return fetch    
    
}