'use client'
import { createTaskAction } from '@/app/action/Task/createTask';
import { fetchAllUsers } from '@/app/action/User/fetchAll'
import Notification from '@/app/Components/Notification';
import { PriorityTypeLevel } from '@/Models/Tache/$Type';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { ReactEventHandler, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import emailjs from '@emailjs/browser';

const NewTask = () => {
  const { user } = useUser();
  const [notification, setnotification] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());

  const removeNotification = () => {
    setnotification('');
  };

  // Les variables d'environnement doivent être préfixées par NEXT_PUBLIC_ pour être accessibles côté client
  const service_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID as string;
  const template_ID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID as string;
  const public_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY as string;

  const { data, isLoading } = useQuery({
    queryKey: ["fetchUsers"],
    queryFn: () => fetchAllUsers(),
    suspense: true
  });

  const { mutate } = useMutation(createTaskAction, {
    mutationKey: ["AddTask"],
    onSuccess: () => setnotification("Tâche ajoutée avec succès"),
    onError: () =>
      window.alert("Erreur : la tâche n'a pas pu être ajoutée, vérifiez vos données avant d'enregistrer")
  });

  const handleSubmit: ReactEventHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const title = form.get('title') as string;
    const description = form.get('description') as string;
    const assignAt = form.get('selectAssignUser') as string;
    const priorityLevel = form.get('selectPriority') as PriorityTypeLevel;

    const taskData = {
      Title: title,
      Description: description,
      Priority: priorityLevel,
      Author_id: user?.id as string,
      Assign_at: assignAt,
      Deadline: startDate
    };

    // Enregistrement de la tâche
    mutate(taskData);

    // Préparation des paramètres pour EmailJS
    const templateParams = {
      from_name: user?.emailAddresses[0].emailAddress,
      to_name: assignAt,
      priority:priorityLevel,
      deadline:startDate,
      message: `
       Titre : ${title} 
       Description : ${description}
       Priorité : ${priorityLevel}
       Auteur du Tache : ${user?.emailAddresses[0].emailAddress} 
       a terminer le ${startDate}`
    };

    // Utilisation de send (et non sendForm) pour envoyer un objet
    emailjs.send(service_ID, template_ID, templateParams, public_KEY)
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        }
      );

    e.currentTarget.reset();
  };

  return (
    <div className='h-screen'>
      {isLoading ? (
        <div className='flex justify-center items-center lg:mt-56'>
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          {notification && (
            <Notification notification={notification} setNotification={removeNotification} />
          )}
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Get started today Add your New Task
            </h1>
            <p className="mx-auto mt-4 max-w-md text-center italic text-gray-500">
              "Petit à petit, l'œuvre prend vie !" <br />
              N’oubliez pas de célébrer chaque étape accomplie. 💪
            </p>

            <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
              <h1 className="text-center text-lg font-bold">👏 Add your New Task</h1>

              <div>
                <label htmlFor="Titre" className="font-semibold">Title</label>
                <div className="relative">
                  <input
                    required
                    id="Titre"
                    name="title"
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                    placeholder="Enter Title for your new Task"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="desc" className="font-semibold">Description</label>
                <div className="relative">
                  <textarea
                    name="description"
                    className="textarea textarea-bordered w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                    placeholder="Entrer votre description"
                  ></textarea>
                </div>
              </div>

              <div>
                <label htmlFor="selection" className="font-semibold">Assign At :</label>
                <div>
                  <select
                    required
                    name="selectAssignUser"
                    id="selection"
                    className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                  >
                    <option value="">Sélectionner un utilisateur</option>
                    {!data ? (
                      <option disabled>Chargement...</option>
                    ) : (
                      data.map((user, key) => (
                        <option key={key} value={user.email}>{user.email}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="selection" className="font-semibold">Priority :</label>
                <div>
                  <select
                    required
                    name="selectPriority"
                    id="selection"
                    className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                  >
                    <option value="">Sélectionner une priorité</option>
                    <option value="urgent_and_important">Urgent et Important</option>
                    <option value="urgent_and__not_important">Urgent Non Important</option>
                    <option value="important_not_urgent">Important et Non Urgent</option>
                    <option value="not_important_not_urgent">Non important et non urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="font-semibold">
                  Deadline au Format Month/Date/Year :
                </label>
                <div className="relative">
                  <DatePicker
                    required
                    selected={startDate}
                    onSelect={(date) => setStartDate(date as Date)}
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
      )}
    </div>
  );
};

export default NewTask;
