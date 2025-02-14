'server only'
import { prisma } from "@/lib/prisma";
import { User } from "./$Type";

export const verifUserAndCreate = async (user:User)=>{
    try {
        const userVerif = prisma.user.findFirst({
            where:{
                email:user.email
            }
        })
        if (!userVerif) {
            return await prisma.user.create({
                data:{
                    id:user.id,
                    email:user.email
                }
            })
        }
    } catch (error) {
        throw error   
    }
}