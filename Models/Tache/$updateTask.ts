"server only"

import { prisma } from "@/lib/prisma"
import { Task } from "./$Type"

export const updateTaskModel = async (idTask: string , dataTask : Task)=>{
    try {
        const updateStatus = await prisma.task.update({
            where:{
                id:idTask
            },
            data:{
                Title:dataTask.Title,
                Assign_at:dataTask.Assign_at,
                Author_id:dataTask.Author_id,
                Description:dataTask.Description,
                Deadline:dataTask.Deadline,
                Priority:dataTask.Priority,
            }
        })
        return updateStatus
    } catch (error) {
        throw error
    }
}