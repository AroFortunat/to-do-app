"use client"
import React, { useState } from 'react'
import { fetchAllTaskByAssignAction } from '@/app/action/Task/fetchTaskById'
import { useUser } from '@clerk/nextjs'
import { updateStatusAction } from '@/app/action/Task/updateStatusTask'
import Link from 'next/link'
import { ClipboardPlus, Pencil, Trash2 } from 'lucide-react'
import { deleteTaskAction } from '@/app/action/Task/deleteTask'
import UpdateForm from '@/app/Components/UpdateForm'
import { useQuery } from '@tanstack/react-query'
import { PriorityType, statusType } from '@prisma/client'
import TaskList from './TaskList'


interface propsss {
  email: string
}
const DataTaskUser: React.FC<propsss> = ({ email }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchTaskUser"],
    queryFn: () => fetchAllTaskByAssignAction(email),
    suspense: true
  })
  const taskInformation = [
    {
      index: "1",
      titre: "Urgent and Important",
      BorderColor: "border-red-500",
      BgColor: "bg-red-500",
      Priority: "urgent_and_important",
      checkBoxColor: "checkbox-error"
    },
    {
      index: "2",
      titre: "Urgent and not Important",
      BorderColor: "border-blue-600",
      BgColor: "bg-blue-600",
      Priority: "urgent_and__not_important",
      checkBoxColor: "checkbox-info"
    },
    {
      index: "3",
      titre: "Important Not Urgent",
      BorderColor: "border-gray-600",
      BgColor: "bg-gray-600",
      Priority: "important_not_urgent",
      checkBoxColor: ""
    },
    {
      index: "4",
      titre: "Not Important Not Urgent",
      BorderColor: "border-green-800",
      BgColor: "bg-green-800",
      Priority: "not_important_not_urgent",
      checkBoxColor: "checkbox-success"
    },
  ]

  return (
    <TaskList data={data} isLoading={isLoading} refetch={refetch} taskInformation={taskInformation} />
  )
}
export default DataTaskUser
