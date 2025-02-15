import { prisma } from "@/lib/prisma"
import { Task } from "./$Type"

export const createTaskModel = async (taches:Task)=>{
    try {
        const newTache = await prisma.task.create({
            data:{
                Title:taches.Title,
                Description:taches.Description??null,
                Priority:taches.Priority,

            }
        })
    } catch (error) {
        console.error(error)
    }
}