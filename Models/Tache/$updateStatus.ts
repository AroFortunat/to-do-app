"server only"

import { prisma } from "@/lib/prisma"

export const updateStatusModel = async (idTask: string)=>{
    try {
        const updateStatus = await prisma.task.update({
            where:{
                id:idTask
            },
            data:{
                status:"termine"
            }
        })
        return updateStatus
    } catch (error) {
        throw error
    }
}