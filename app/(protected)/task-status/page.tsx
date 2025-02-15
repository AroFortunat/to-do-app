"use client"
import { fetchAllTaskByIdAction } from '@/app/action/Task/fetchTaskById'
import { PriorityTypeLevel, statusTypeTask } from '@/Models/Tache/$Type'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

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
  const fetchTasks = async (id: string) => {
    const AllTaskByUser = await fetchAllTaskByIdAction(id)
    setTasks(AllTaskByUser)
    setLoading(false)
  }
  useEffect(() => {
    if (user) {
      fetchTasks(user.id)
    }
  }, [user]);
  return (
    <div>
      <div className="overflow-x-auto">
        <div className=' flex items-center justify-center'>
          <h2 className='font-bold text-2xl p-4'>Liste de taches et status</h2>
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
                <th>Status</th>
                <th>Author</th>
                <th>Deadline</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                {Tasks?.map((task, key) => (
                  <>
                    <th>{key+1}</th>
                    <td>{task.Title}</td>
                    <td>{task.Description}</td>
                    <td>{task.Priority}</td>
                    <td>{task.status}</td>
                    <td>{task.ForeignKeyUser.email}</td>
                    <td>{`${task.Deadline.getDate()}/${task.Deadline.getMonth()}/${task.Deadline.getFullYear()}`}</td>
                    <td>{`${task.Created_At.getDate()}/${task.Created_At.getMonth()}/${task.Created_At.getFullYear()}`}</td>
                  </>
                ))}

              </tr>
            </tbody>
          </table>
        )}

      </div>
    </div>
  )
}

export default page
