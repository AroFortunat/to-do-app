import { CircleAlert } from 'lucide-react';
import React, { useEffect } from 'react'
interface propss {
    notification: string,
    setNotification: (a: string) => void
}
const Notification: React.FC<propss> = ({ notification, setNotification }) => {
    useEffect(() => {
        setTimeout(() => {
            setNotification('')
        }, 3000);
    }, []);
    return (
        <div>
            <div className="mt-32 mr-14 toast toast-top toast-end">
                <div className=" text-white flex alert alert-success">
                    <CircleAlert className='text-white w-5 h-5' />
                    <span>{notification}</span>
                </div>
            </div>
        </div>
    )
}

export default Notification
