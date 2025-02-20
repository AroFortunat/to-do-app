

import React, { Suspense } from 'react'
import { currentUser } from '@clerk/nextjs/server'
import CallData from './components/Call-data.tsx'

const page = async () => {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0].emailAddress as string
  return (
    <div>
      <Suspense fallback={"wait ..."}>
        <CallData email={userEmail} />
      </Suspense>
    </div>
  )
}

export default page
