"use client"
import React, { useEffect, useState } from 'react'
import UrgentAndImportant from './UrgentAndImportant'
import UrgentNotImportant from './UrgentNotImportant'
import ImportantNotUrgent from './ImportantNotUrgent'
import NotImportantAndNotUrgent from './NotImportantAndNotUrgent'
import { fetchAllTaskByAssignAction } from '@/app/action/Task/fetchTaskById'
import { useUser } from '@clerk/nextjs'
import { PriorityTypeLevel, statusTypeTask } from '@/Models/Tache/$Type'

type tabTaskByUser = ({
  ForeignKeyUser: {
    id: string;
    email: string;
  };
} & {
  id: string;
  Title: string;
  Description: string | null;
  Priority: PriorityTypeLevel;
  status: statusTypeTask;
  Author_id: string;
  Assign_at: string;
  Deadline: Date;
  Created_At: Date;
})

const TaskList = () => {
  const { user } = useUser()
  const [Tasks, setTasks] = useState<tabTaskByUser[]>([]);
  const [Loader, setLoader] = useState<boolean>(true);
  const fetchTasks = async (email: string) => {
    const AllTaskByUser = await fetchAllTaskByAssignAction(email)
    setTasks(AllTaskByUser || [])
  }
  useEffect(() => {
    if (user) {
      fetchTasks(user.emailAddresses[0].emailAddress)
      setLoader(false)
    }
  }, [user]);
  return (
    <div className='m-6'>
      {Loader ? (
        <>
          <div className='flex justify-center items-center lg:mt-56'>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <UrgentAndImportant TasksList={Tasks} />
          <UrgentNotImportant />
          <ImportantNotUrgent />
          <NotImportantAndNotUrgent />
        </div>
      )
      }

    </div >
  )
}

export default TaskList
