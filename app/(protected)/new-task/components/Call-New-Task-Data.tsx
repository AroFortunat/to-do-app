'use client'
import { fetchAllUsers } from '@/app/action/User/fetchAll'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import NewTask from './NewTask';

interface propsss{
  email:string,
  id:string
}
const CallNewTaskData:React.FC<propsss> = ({email,id}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchUsers"],
    queryFn: () => fetchAllUsers(),
    suspense: true
  });

  return (
    <>
    <NewTask email={email} id={id} data={data} isLoading={isLoading}/>
    </>
  );
};

export default CallNewTaskData;
