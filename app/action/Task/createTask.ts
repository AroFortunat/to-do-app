"use server"
import { createTaskModel } from "@/Models/Tache/$create"
import { Task } from "@/Models/Tache/$Type"

export const createTaskAction = async (tache:Task)=>{
    try {
        const newTask = await createTaskModel(tache)
        return newTask
    } catch (error) {
        throw error
    }
}