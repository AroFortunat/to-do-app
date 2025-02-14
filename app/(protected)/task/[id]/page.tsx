'use client'
import React, { useEffect } from 'react'
import TaskList from '../components/TaskList'
import { useUser } from '@clerk/nextjs'
import { verifUser } from '@/app/action/User/verif'

const page = () => {
  const { user } = useUser()
  const verification_Utilisateur_Existant_Et_Ajouter_A_la_Base_si_Inexistant = async (id: string, email: string) => {
    return await verifUser(id, email)
  }
  useEffect(() => {
      if (user) {
        verification_Utilisateur_Existant_Et_Ajouter_A_la_Base_si_Inexistant(user.id,user.emailAddresses[0].emailAddress)
      }
  }, [user]);
  return (
    <div>
      <TaskList />
    </div>
  )
}

export default page
