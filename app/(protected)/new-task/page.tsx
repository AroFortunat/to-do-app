import React, { Suspense } from 'react'
import CallNewTaskData from './components/Call-New-Task-Data'
import { currentUser } from '@clerk/nextjs/server'

const page = async () => {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress as string
  const userId = user?.emailAddresses[0].id as string
  return (
    <div>
      <Suspense fallback={"wait ..."}>
        < CallNewTaskData email={userEmail} id={userId} />
      </Suspense>
    </div>
  )
}

export default page
