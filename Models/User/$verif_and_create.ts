'server only'
import { prisma } from "@/lib/prisma";
import { User } from "./$Type";

export const verifUserAndCreate = async (user:User)=>{
    try {
        const userVerif = await prisma.user.findFirst({
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
        }else{
            console.error('User existant déjà')
        } 
    } catch (error) {
        console.error(error)   
    }
}