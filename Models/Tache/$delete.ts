"server only"

import { prisma } from "@/lib/prisma"

export const deleteTaskModel = async (idTask: string)=>{
    try {
        const updateStatus = await prisma.task.delete({
            where:{
                id:idTask
            },
        })
        return updateStatus
    } catch (error) {
        throw error
    }
}