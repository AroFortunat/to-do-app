"use client"

import React, { Suspense } from 'react'
import TaskStatusByUser from './components/task-status-by-User'

const page = () => {
  return (
    <div>
      <Suspense fallback={"wait ..."}>
        <TaskStatusByUser />
      </Suspense>
    </div>
  )
}

export default page
