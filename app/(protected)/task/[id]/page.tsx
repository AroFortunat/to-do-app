
import React, { Suspense } from 'react'
import DataTaskUser from '../components/DataTaskUser'
import { currentUser } from '@clerk/nextjs/server'


const page = async () => {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress as string
  return (
    <div>
      <Suspense>
        <DataTaskUser email={userEmail} />
      </Suspense>
    </div>
  )
}

export default page
