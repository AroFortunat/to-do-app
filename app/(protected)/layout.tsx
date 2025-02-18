'use client'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { ChartNoAxesCombined, ClipboardPlus, LayoutDashboard } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import QueryProvider from '../Components/QueryProvider'
interface propss {
    children: ReactNode
}
const layout: React.FC<propss> = ({ children }) => {
    const { user } = useUser()
    const [Loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (user) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [user]);
    return (
        <div>
            {Loading ? (
                <div className='w-full flex items-center justify-center'>
                    <span className="loading loading-spinner loading-sm"></span>
                </div>
            ) : (
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
                            <li className='flex btn btn-secondary text-white'>
                                <LayoutDashboard />
                                <Link href={`/task/${user?.id}`}>Task</Link></li>
                            <li className='flex btn btn-secondary text-white'>
                                <ClipboardPlus />
                                <Link href={'/new-task'}>New Task</Link></li>
                            <li className='flex btn btn-secondary text-white'>
                                <ChartNoAxesCombined />
                                <Link href={'/task-status'}>Task Status</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='mr-6'>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </nav>
            )}
            <QueryProvider>
                <Suspense fallback={"En attente"}>
                    {children}
                </Suspense>
            </QueryProvider>
        </div>
    )
}

export default layout
