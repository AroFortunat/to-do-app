"use client";
import { fetchAllTaskByAssignAction } from '@/app/action/Task/fetchTaskById';
import React from 'react';
import TaskStatusByUser from './task-status-by-User';
import { useQuery } from '@tanstack/react-query';


interface propss{
  email:string
}
const CallData:React.FC<propss> = ({email}) => {
  const {data,isLoading} = useQuery({
      queryKey:["fetchTaskByUser"],
      queryFn:()=>fetchAllTaskByAssignAction(email),
      suspense:true
  })
  return(
    <TaskStatusByUser data={data} isLoading={isLoading}/>
  )
};

export default CallData;
