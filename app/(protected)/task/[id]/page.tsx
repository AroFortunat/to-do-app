'use client'
import React, { Suspense } from 'react'
import TaskList from '../components/TaskList'


const page = () => {

  return (
    <div>
      <Suspense>
        <TaskList />
      </Suspense>
    </div>
  )
}

export default page
