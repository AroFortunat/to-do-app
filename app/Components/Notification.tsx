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
            <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                    <span>{notification}</span>
                </div>
            </div>
        </div>
    )
}

export default Notification
