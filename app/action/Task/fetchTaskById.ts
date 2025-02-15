"use server"

import { fetchAllTaskByIdModel } from "@/Models/Tache/$fetchById"

export const fetchAllTaskByIdAction = async (idUser:string) =>{
        const fetch = await fetchAllTaskByIdModel(idUser)
        return fetch    
    
}