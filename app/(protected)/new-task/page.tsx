'use client'
import { fetchAllUsers } from '@/app/action/User/fetchAll'
import { User } from '@/Models/User/$Type';
import React, { ReactEventHandler, useEffect, useState } from 'react'

const page = () => {
  const [Users, setUsers] = useState<User[]>([]);
  const [Loader, setLoader] = useState<boolean>(false);
  const fetchUsers = async () => {
    const f = await fetchAllUsers()
    setUsers(f)
  }

  const handleSubmit: ReactEventHandler = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    fetchUsers()
  }, []);

  return (
    <div className='h-screen'>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today Add your New Task</h1>

          <p className="mx-auto mt-4 max-w-md text-center italic text-gray-500">
            "Petit à petit, l'œuvre prend vie !"
            N’oubliez pas de célébrer chaque étape accomplie. 💪
          </p>

          <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <h1 className="text-center text-lg font-bold">👏 Add your New Task</h1>

            <div>
              <label htmlFor="Titre" className="font-semibold">Title</label>
              <div className="relative">
                <input
                  required
                  id='Titre'
                  name='title'
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                  placeholder="Enter Title for your new Task"
                />
              </div>
            </div>
            <div>
              <label htmlFor="desc" className="font-semibold">Description</label>
              <div className="relative">
                <textarea className="textarea textarea-bordered w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs" placeholder="Entrer votre description"></textarea>

              </div>
            </div>
            <div>
              <label htmlFor="selection" className="font-semibold">Assign At :</label>
              <div>
                <select
                  required
                  name="select"
                  id="selection"
                  className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                >
                  <option value="">Select User</option>
                  {!Users ? (
                    <div className="skeleton h-4 w-28"></div>
                  ) : (
                    <>
                      {Users.map((user, key) => (
                        <option key={key} value={user.id}>{user.email}</option>
                      ))}</>
                  )}

                </select>
              </div>

            </div>
            <div>
              <label htmlFor="selection" className="font-semibold">Priority :</label>
              <div>
                <select
                  required
                  name="select"
                  id="selection"
                  className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                >
                  <option value="">Priority</option>
                  <option value=""></option>
                </select>
              </div>

            </div>
            <div>
              <label htmlFor="email" className="font-semibold">Deadline : </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-xs"
                  placeholder="Enter Title for your new Task"
                />
              </div>
            </div>


            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page
