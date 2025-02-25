import React, { Suspense } from 'react'
import CallNewTaskData from './components/Call-New-Task-Data'
import { currentUser } from '@clerk/nextjs/server'
import { fetchAllUsers } from '@/app/action/User/fetchAll'

const page = async () => {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress as string
  const userId = user?.emailAddresses[0].id as string
  const data = await fetchAllUsers()
  return (
    <div>
      <Suspense fallback={"wait ..."}>
        < CallNewTaskData email={userEmail} id={userId} initialData={data} />
      </Suspense>
    </div>
  )
}

export default page
