"server only"
import { prisma } from "@/lib/prisma"

export const fetchAllTaskByIdModel = async (idUser:string)=>{
    try {
        if (!idUser) return console.error('Champ manquant') 
        const fetchAllTask = await prisma.task.findMany({
            where:{
                Assign_at:idUser
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
