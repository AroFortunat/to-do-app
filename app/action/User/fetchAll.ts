"use server"

import { fetchAllUserModel } from "@/Models/User/$fetchAllUser"

export const fetchAllUsers = async ()=>{
    return await fetchAllUserModel()
}