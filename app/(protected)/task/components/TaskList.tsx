import React from 'react'
import UrgentAndImportant from './UrgentAndImportant'
import UrgentNotImportant from './UrgentNotImportant'
import ImportantNotUrgent from './ImportantNotUrgent'
import NotImportantAndNotUrgent from './NotImportantAndNotUrgent'

const TaskList = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="grid grid-cols-2 gap-4">
        <UrgentAndImportant/>
        <UrgentNotImportant/>
        <ImportantNotUrgent/>
        <NotImportantAndNotUrgent/>
      </div>
    </div>
  )
}

export default TaskList
