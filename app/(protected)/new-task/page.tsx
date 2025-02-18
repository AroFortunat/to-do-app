import React, { Suspense } from 'react'
import NewTask from './components/NewTask'

const page = () => {
  return (
    <div>
      <Suspense fallback={"wait ..."}>
        <NewTask />
      </Suspense>
    </div>
  )
}

export default page
