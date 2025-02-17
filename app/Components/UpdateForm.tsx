"use client"
import { PriorityTypeLevel, statusTypeTask } from '@/Models/Tache/$Type'
import { User } from '@/Models/User/$Type';
import React, { ReactEventHandler, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { fetchAllUsers } from '../action/User/fetchAll';
import { useUser } from '@clerk/nextjs';
import { updateTaskAction } from '../action/Task/updateTask';
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

interface propss {
    tache: tabTaskByUser,
    userEmail:string,
    fetchTaskByUser: (email : string) => Promise<void>
}
const UpdateForm: React.FC<propss> = ({ tache,fetchTaskByUser,userEmail }) => {
    const { user } = useUser()
    const [Users, setUsers] = useState<User[]>([]);
    const fetchUsers = async () => {
        const f = await fetchAllUsers()
        setUsers(f)
    }
    const [Loader, setLoader] = useState<boolean>(true);
    const [TitleTaskUpdate, setTitleTaskUpdate] = useState<string>(tache.Title);
    const [Description, setDescription] = useState<string>(tache.Description as string);
    const [UserAssignAt, setUserAssignAt] = useState(tache.Assign_at);
    const [PriorityUpdate, setPriorityUpdate] = useState(tache.Priority);
    const [DeadlineUpdate, setDeadlineUpdate] = useState(tache.Deadline);
    const handleSubmit: ReactEventHandler = async (e) => {
        const form = document.getElementById(`${tache.id}`) as HTMLDialogElement
        e.preventDefault()
        const dataTaskUpdate = {
            Title: TitleTaskUpdate,
            Description: Description ?? null,
            Priority: PriorityUpdate,
            Author_id: tache.Author_id,
            Assign_at: UserAssignAt,
            Deadline: DeadlineUpdate,
        }

        await updateTaskAction(tache.id,dataTaskUpdate)
        fetchTaskByUser(userEmail)
        form.close()
    }
    useEffect(() => {
        if (user) {
            fetchUsers()
            setLoader(false)
        }
    }, [user]);
    return (
        <div>
            {/* Update code */}
            <dialog id={`${tache.id}`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Update Note</h3>
                    {Loader ? (
                        <div className='flex items-center justify-center'>
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                                <h1 className="text-center text-lg font-bold">📝 Update your Task</h1>

                                <div>
                                    <label htmlFor="Titre" className="font-semibold">Title</label>
                                    <div className="relative">
                                        <input
                                            required
                                            id='Titre'
                                            name='title'
                                            type="text"
                                            value={TitleTaskUpdate}
                                            onChange={(e) => setTitleTaskUpdate(e.target.value)}
                                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                                            placeholder="Enter Title for your new Task"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="desc" className="font-semibold">Description</label>
                                    <div className="relative">
                                        <textarea
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            name='description'
                                            className="textarea textarea-bordered w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs" placeholder="Entrer votre description"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="selection" className="font-semibold">Assign At :</label>
                                    <div>
                                        <select
                                            value={UserAssignAt}
                                            onChange={(e) => setUserAssignAt(e.target.value)}
                                            required
                                            name="selectAssignUser"
                                            id="selection"
                                            className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                                        >
                                            <option></option>
                                            {!Users ? (
                                                <div className="skeleton h-4 w-28"></div>
                                            ) : (
                                                <>
                                                    {Users.map((user, key) => (
                                                        <option key={key} value={user.email}>{user.email}</option>
                                                    ))}</>
                                            )}
                                        </select>
                                    </div>

                                </div>
                                <div>
                                    <label htmlFor="selection" className="font-semibold">Priority :</label>
                                    <div>
                                        <select
                                            value={PriorityUpdate}
                                            onChange={(e) => setPriorityUpdate(e.target.value as PriorityTypeLevel)}
                                            required
                                            name="selectPriority"
                                            id="selection"
                                            className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                                        >
                                            <option></option>
                                            <option value="urgent_and_important"> Urgent et Important</option>
                                            <option value="urgent_and__not_important">Urgent Non Important</option>
                                            <option value="important_not_urgent">Important et Non Urgent</option>
                                            <option value="not_important_not_urgent">Non important et non urgent </option>
                                        </select>
                                    </div>

                                </div>
                                <div>
                                    <label htmlFor="email" className="font-semibold">Deadline au Format Month/Date/Year : </label>
                                    <div className="relative">
                                        <DatePicker
                                            required
                                            selected={DeadlineUpdate}
                                            onSelect={(date) => setDeadlineUpdate(date as Date)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                                >
                                    Enregistrer Votre modification
                                </button>
                            </form>
                        </>
                    )}

                </div>
            </dialog>
        </div>
    )
}
export default UpdateForm
