'use client'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { ReactNode } from 'react'
interface propss {
    children: ReactNode
}
const layout: React.FC<propss> = ({ children }) => {
    const { user } = useUser()
    return (
        <div>
            <nav className='flex items-center justify-between p-4'>
                <div>
                    <a href={`/task/${user?.id}`}>
                        <Image
                            className='ml-5 w-44'
                            alt='image du logo'
                            width={741}
                            height={286}
                            src={'/Logo.png'} />
                    </a>
                </div>
                <div className=''>
                    <ul className='flex gap-4'>
                        <li className='btn btn-secondary text-white'><a href={`/task/${user?.id}`}>Task</a></li>
                        <li className='btn btn-secondary text-white'><a href={'/new-task'}>New Task</a></li>
                        <li className='btn btn-secondary text-white'><a href={`/task-status`}>Task Status</a></li>
                    </ul>
                </div>
                <div className='mr-6'>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
            {children}
        </div>
    )
}

export default layout
