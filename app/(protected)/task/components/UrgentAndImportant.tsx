import { PriorityTypeLevel, statusTypeTask } from '@/Models/Tache/$Type';
import { ShieldAlert } from 'lucide-react'
import React, { useState } from 'react'
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
interface propsss {
    TasksList: tabTaskByUser[]
}
const UrgentAndImportant: React.FC<propsss> = ({ TasksList }) => {
    const taskFilterPriority = TasksList.filter((task) => task.Priority === 'urgent_and_important' && task.status === 'en_cours')
    return (
        <div className='max-h-screen'>
            <article className="rounded-xl border border-red-500 h-[450px] overflow-scroll">
                <div className="flex bg-red-500 items-center p-5 rounded-t-xl gap-4">
                    <div className='w-10 h-10 border-2 flex items-center justify-center rounded-full'>
                        <span className='text-white font-bold'>1</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white">Urgent et important ({taskFilterPriority.length})</h3>
                    </div>
                </div>

                <ul className="mt-4 p-4 space-y-2">
                    {taskFilterPriority.map((task, key) => (
                        <li key={key} className='block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600"'>
                            <div className='flex'>
                                <input type="checkbox" className="checkbox checkbox-error" />
                                <div className='ml-4'>
                                    <h3 className="">
                                        <strong className="font-bold">{task.Title} (Deadline : {`${task.Deadline.getDate()}/${task.Deadline.getMonth()}/${task.Deadline.getFullYear()}`})</strong>
                                    </h3>
                                    <p className="mt-1 text-xs font-medium">
                                        {task.Description}
                                    </p>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            </article>
        </div>
    )
}

export default UrgentAndImportant
