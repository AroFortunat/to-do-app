'server only'
import { prisma } from "@/lib/prisma"
import { Task } from "./$Type"

export const createTaskModel = async (taches:Task)=>{
    try {
        const newTache = await prisma.task.create({
            data:{
                Title:taches.Title,
                Description:taches.Description??null,
                Priority:taches.Priority,
                Assigner_à:taches.Assign_at,
                Deadline:taches.Deadline,
                Author_id:taches.Author_id
            }
        })
        return newTache
    } catch (error) {
        console.error(error)
    }
}