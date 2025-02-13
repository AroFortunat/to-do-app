import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { ReactNode } from 'react'
interface propss {
    children: ReactNode
}
const layout: React.FC<propss> = ({ children }) => {
    return (
        <div>
            <nav className='flex items-center justify-between p-4'>
                <div>Logo</div>
                <div className=''>
                    <ul className='flex gap-4'>
                        <li className='btn btn-secondary text-white'><Link href={``}>Task</Link></li>
                        <li className='btn btn-secondary text-white'><Link href={'/new-task'}>New Task</Link></li>
                        <li className='btn btn-secondary text-white'><Link href={`/task-status`}>Task Status</Link></li>
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
