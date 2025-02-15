"server only"
import { prisma } from "@/lib/prisma"

export const fetchAllTaskByIdModel = async (userEmail:string)=>{
    try {
        if (!userEmail) return console.error('Champ manquant') 
        const fetchAllTask = await prisma.task.findMany({
            where:{
                Assign_at:userEmail
            },
            include:{
                ForeignKeyUser:true
            }
        })
        return fetchAllTask 
    } catch (error) {
        throw error
    }
}
