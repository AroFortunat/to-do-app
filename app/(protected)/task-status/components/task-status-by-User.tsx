"use client";
import { PriorityType, statusType } from '@prisma/client';
import React, { ReactEventHandler, useState } from 'react';

type dataType = void | ({
  ForeignKeyUser: {
      id: string;
      email: string;
  };
} & {
  id: string;
  Title: string;
  Description: string | null;
  Priority: PriorityType;
  status: statusType;
  Author_id: string;
  Assign_at: string;
  Deadline: Date;
  Created_At: Date;
})[] | undefined
interface propss{
  data:dataType,
  isLoading:boolean
}
const TaskStatusByUser:React.FC<propss> = ({data,isLoading}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [tasks, setTasks] = useState(data);
  const handleSelect: ReactEventHandler = async (e) => {
    const event = e.target as HTMLSelectElement;
    const value = event.value;
    if (value === "All") {
      setTasks(data)
    } else {
      const filteredTasks = data?.filter((task) => task.status === value);
      setTasks(filteredTasks ?? []);
      setCurrentPage(1); // réinitialiser la pagination après filtrage
    }
  };

  // Calculer les tâches à afficher selon la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = tasks?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((tasks?.length ?? 0) / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center">
          <h2 className="font-bold text-2xl p-4">Liste de taches et status</h2>
          <select onChange={handleSelect} className="select select-secondary w-full max-w-xs">
            <option>Filtrer par Status :</option>
            <option value="All">All</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
          </select>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center lg:mt-56">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status ({tasks?.length})</th>
                  <th>Author</th>
                  <th>Deadline</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks?.map((task, index) => (
                  <tr key={index}>
                    <th>{index + 1 + indexOfFirstItem}</th>
                    <td>{task.Title}</td>
                    <td>{task.Description}</td>
                    <td className='flex items-center gap-4'>
                      <div 
                      className={`w-3 h-3 rounded-full 
                      ${task.Priority === 'urgent_and_important' ? 'bg-red-500' : task.Priority === 'urgent_and__not_important' ? "bg-blue-600" : task.Priority === 'important_not_urgent' ? 'bg-gray-600' : task.Priority === 'not_important_not_urgent' ? "bg-green-800" : ""}`}></div>
                      {task.Priority}</td>
                    <td>{task.status}</td>
                    <td>{task.ForeignKeyUser.email}</td>
                    <td>
                      {`${task.Deadline.getDate()}/${task.Deadline.getMonth() + 1
                        }/${task.Deadline.getFullYear()}`}
                    </td>
                    <td>
                      {`${task.Created_At.getDate()}/${task.Created_At.getMonth() + 1
                        }/${task.Created_At.getFullYear()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={handlePrevious}
                  disabled={currentPage <= 1}
                >
                  «
                </button>
                <button className="join-item btn">
                  Page {currentPage} {totalPages > 0 && `of ${totalPages}`}
                </button>
                <button
                  className="join-item btn"
                  onClick={handleNext}
                  disabled={currentPage >= totalPages}
                >
                  »
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskStatusByUser;
