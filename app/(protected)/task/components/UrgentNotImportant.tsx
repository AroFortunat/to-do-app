import React from 'react'

const UrgentNotImportant = () => {
    return (
        <div className='max-h-screen h-1/2'>
            <article className="rounded-xl border border-blue-600 ">
                <div className="flex bg-blue-600 items-center p-5 rounded-t-xl gap-4">
                    <div className='w-10 h-10 border-2 flex items-center justify-center rounded-full'>
                        <span className='text-white font-bold'>2</span>
                    </div>                    <div>
                        <h3 className="text-lg font-medium text-white">Urgent and not important</h3>

                    </div>
                </div>

                <ul className="mt-4 p-4 space-y-2">
                    <li>
                        <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                            <strong className="font-medium">Project A</strong>

                            <p className="mt-1 text-xs font-medium">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequuntur deleniti,
                                unde ab ut in!
                            </p>
                        </a>
                    </li>

                    <li>
                        <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                            <strong className="font-medium">Project B</strong>

                            <p className="mt-1 text-xs font-medium">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
                            </p>
                        </a>
                    </li>
                </ul>
            </article>
        </div>
    )
}

export default UrgentNotImportant
