"use client"
import React, { useEffect, useState } from 'react'
import { fetchAllTaskByAssignAction } from '@/app/action/Task/fetchTaskById'
import { useUser } from '@clerk/nextjs'
import { PriorityTypeLevel, statusTypeTask } from '@/Models/Tache/$Type'
import { updateStatusAction } from '@/app/action/Task/updateStatusTask'
import Link from 'next/link'

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
  const taskInformation = [{
    index: "1",
    titre: "Urgent and Important",
    BorderColor: "border-red-500",
    BgColor: "bg-red-500",
    Priority: "urgent_and_important",
    checkBoxColor: "checkbox-error"
  }, {
    index: "2",
    titre: "Urgent and not Important",
    BorderColor: "border-blue-600",
    BgColor: "bg-blue-600",
    Priority: "urgent_and__not_important",
    checkBoxColor: "checkbox-info"

  }, {
    index: "3",
    titre: "Important Not Urgent",
    BorderColor: "border-gray-600",
    BgColor: "bg-gray-600",
    Priority: "important_not_urgent",
    checkBoxColor: ""
  }, {
    index: "4",
    titre: "Not Important Not Urgent ",
    BorderColor: "border-green-800",
    BgColor: "bg-green-800",
    Priority: "not_important_not_urgent",
    checkBoxColor:"checkbox-success"
  },]
  const handleCheckTask = async (idTask: string) => {
    await updateStatusAction(idTask)
    fetchTasks(user?.emailAddresses[0].emailAddress)
  }
  return (
    <div className='m-6'>
      {Loader ? (
        <>
          <div className='flex justify-center items-center lg:mt-56'>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {taskInformation.map((taskInfo, key) => {
            const taskFilterPriority = Tasks.filter((task) => task.Priority === `${taskInformation[key].Priority}` && task.status === 'en_cours')
            return (
              <>
                <div key={key} className='max-h-screen'>
                  <article className={`rounded-xl border ${taskInfo.BorderColor} h-[400px] overflow-y-scroll`}>
                    <div className={`flex ${taskInfo.BgColor} items-center p-5  gap-4`}>
                      <div className='w-10 h-10 border-2 flex items-center justify-center rounded-full'>
                        <span className='text-white font-bold'>{taskInfo.index}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold uppercase text-white">{taskInfo.titre} ({taskFilterPriority.length})</h3>
                      </div>
                    </div>
                    {taskFilterPriority.length === 0 ? (
                      <div className=' flex flex-col justify-center items-center mt-28'>
                        <p className='text-xl'>Tous les taches sont terminer Veuillez crée des nouvelles taches</p>
                        <Link href={'/new-task'} className='btn btn-secondary mt-10'>+ Ajouter une nouvelle Taches</Link>
                      </div>
                    ) : (
                      <ul className="mt-4 p-4 space-y-2">
                        {taskFilterPriority.map((tache, cle) => (
                          <li key={cle} className='block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600"'>
                            <div className='flex'>
                              <input type="checkbox" onClick={() => handleCheckTask(tache.id)} className={`checkbox ${taskInformation[key].checkBoxColor}`} />
                              <div className='ml-4'>
                                <h3 className="">
                                  <strong className="font-bold">{tache.Title} (Deadline : {`${tache.Deadline.getDate()}/${tache.Deadline.getMonth()}/${tache.Deadline.getFullYear()}`})</strong>
                                </h3>
                                <p className="mt-1 text-xs font-medium">
                                  {tache.Description}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </div>
              </>
            )
          })}
        </div>
      )
      }

    </div >
  )
}

export default TaskList
