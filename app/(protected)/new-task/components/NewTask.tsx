"use client";
import { createTaskAction } from "@/app/action/Task/createTask";
import Notification from "@/app/Components/Notification";
import { PriorityTypeLevel } from "@/Models/Tache/$Type";
import { useMutation } from "@tanstack/react-query";
import React, { useState, FormEventHandler } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DataType = {
  email: string;
  id: string;
}[];

interface Props {
  id: string;
  data: DataType | undefined;
  isLoading: boolean;
}

const NewTask: React.FC<Props> = ({ id, data, isLoading }) => {
  const [notification, setNotification] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());

  const removeNotification = () => setNotification("");

  const { mutateAsync } = useMutation(createTaskAction, {
    mutationKey: ["AddTask"],
    onSuccess: () => {
      setNotification("Tâche ajoutée avec succès");
      (document.getElementById("task-form") as HTMLFormElement)?.reset(); // Réinitialise le formulaire uniquement après succès
    },
    onError: () => {
      window.alert("Erreur : la tâche n'a pas pu être ajoutée, vérifiez vos données avant d'enregistrer");
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const assignAt = form.get("selectAssignUser") as string;
    const priorityLevel = form.get("selectPriority") as PriorityTypeLevel;

    if (!title || !description || !assignAt || !priorityLevel) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const taskData = {
      Title: title,
      Description: description,
      Priority: priorityLevel,
      Author_id: id,
      Assign_at: assignAt,
      Deadline: startDate,
    };

    try {
      await mutateAsync(taskData);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  };

  return (
    <div className="h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center lg:mt-56">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          {notification && <Notification notification={notification} setNotification={removeNotification} />}
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Get started today Add your New Task
            </h1>
            <p className="mx-auto mt-4 max-w-md text-center italic text-gray-500">
              "Petit à petit, l'œuvre prend vie !" <br />
              N’oubliez pas de célébrer chaque étape accomplie. 💪
            </p>

            <form id="task-form" onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
              <h1 className="text-center text-lg font-bold">👏 Add your New Task</h1>

              <div>
                <label htmlFor="Titre" className="font-semibold">Title</label>
                <input
                  required
                  id="Titre"
                  name="title"
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                  placeholder="Enter Title for your new Task"
                />
              </div>

              <div>
                <label htmlFor="desc" className="font-semibold">Description</label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                  placeholder="Entrer votre description"
                ></textarea>
              </div>

              <div>
                <label htmlFor="selection" className="font-semibold">Assign At :</label>
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
                    data.map((user) => <option key={user.id} value={user.email}>{user.email}</option>)
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="font-semibold">Priority :</label>
                <select
                  required
                  name="selectPriority"
                  id="priority"
                  className="mt-1.5 w-full p-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                >
                  <option value="">Sélectionner une priorité</option>
                  <option value="urgent_and_important">Urgent et Important</option>
                  <option value="urgent_and__not_important">Urgent Non Important</option>
                  <option value="important_not_urgent">Important et Non Urgent</option>
                  <option value="not_important_not_urgent">Non important et non urgent</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Deadline au Format Month/Date/Year :</label>
                <DatePicker
                  required
                  selected={startDate}
                  onChange={(date) => setStartDate(date as Date)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <button type="submit" className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
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
