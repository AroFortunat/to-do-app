"server only"
import { prisma } from "@/lib/prisma"

export const fetchAllUserModel = async ()=>{
    try {
        const users = await prisma.user.findMany()
        return users
    } catch (error) {
        throw error
    }
}