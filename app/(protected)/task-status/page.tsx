"use client"
import { fetchAllTaskByAssignAction } from '@/app/action/Task/fetchTaskById'
import { PriorityTypeLevel, statusTypeTask } from '@/Models/Tache/$Type'
import { useUser } from '@clerk/nextjs'
import React, { ReactEventHandler, useEffect, useState } from 'react'

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

const page = () => {
  const { user } = useUser()
  const [Loading, setLoading] = useState<boolean>(true);
  const [Tasks, setTasks] = useState<void | tabTaskByUser[]>([]);
  const fetchTasks = async (email: string) => {
    const AllTaskByUser = await fetchAllTaskByAssignAction(email)
    setTasks(AllTaskByUser)
    setLoading(false)
  }
  useEffect(() => {
    if (user) {
      fetchTasks(user.emailAddresses[0].emailAddress)
    }
  }, [user]);
  const handleSelect:ReactEventHandler = (e)=>{
      const event = e.target as HTMLSelectElement
      if (event.value === "All") {
        fetchTasks(user?.emailAddresses[0].emailAddress as string)

      }
      if (Tasks) {
        const tabFilterTask = Tasks.filter((task)=>task.status === event.value)
        console.log(tabFilterTask)
        setTasks(tabFilterTask)
      }
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <div className=' flex items-center justify-center'>
          <h2 className='font-bold text-2xl p-4'>Liste de taches et status</h2>
          <select onChange={handleSelect} className="select select-secondary w-full max-w-xs">
            <option>Filtrer par Status : </option>
            <option value="All">All</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
          </select>
        </div>
        {Loading ? (
          <div className='flex justify-center items-center lg:mt-56'>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status  ({Tasks?.length})</th>
                <th>Author</th>
                <th>Deadline</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {Tasks?.map((task, key) => (
                <tr key={key}>
                  <th>{key + 1}</th>
                  <td>{task.Title}</td>
                  <td>{task.Description}</td>
                  <td>{task.Priority}</td>
                  <td>{task.status}</td>
                  <td>{task.ForeignKeyUser.email}</td>
                  <td>{`${task.Deadline.getDate()}/${task.Deadline.getMonth()}/${task.Deadline.getFullYear()}`}</td>
                  <td>{`${task.Created_At.getDate()}/${task.Created_At.getMonth()}/${task.Created_At.getFullYear()}`}</td>
                </tr>
              ))}

            </tbody>
          </table>
        )}

      </div>
    </div>
  )
}

export default page
