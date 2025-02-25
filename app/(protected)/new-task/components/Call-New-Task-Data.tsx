'use client'
import { fetchAllUsers } from '@/app/action/User/fetchAll'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import NewTask from './NewTask';

interface propsss{
  email:string,
  id:string,
  initialData:{
    id: string;
    email: string;
  }[]
}
const CallNewTaskData:React.FC<propsss> = ({email,id,initialData}) => {
  const { data, isLoading } = useQuery<{
    id: string;
    email: string;
  }[]>({
    queryKey: ["fetchUsers"],
    queryFn:fetchAllUsers,
    initialData,
  });
  return (
    <>
    <NewTask id={id} data={data} isLoading={isLoading}/>
    </>
  );
};

export default CallNewTaskData;
