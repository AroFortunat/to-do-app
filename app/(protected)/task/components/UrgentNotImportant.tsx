import React from 'react'

const UrgentNotImportant = () => {
    return (
        <div className='max-h-screen h-1/2'>
            <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">
                <div className="flex items-center gap-4">
                    <div className='w-10 h-10 border-2 flex items-center justify-center rounded-full'>
                        <span className='text-white font-bold'>2</span>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-white">Urgent Not Important</h3>

                        <div className="flow-root">
                            <ul className="-m-1 flex flex-wrap">
                                <li className="p-1 leading-none">
                                    <a href="#" className="text-xs font-medium text-gray-300"> Twitter </a>
                                </li>

                                <li className="p-1 leading-none">
                                    <a href="#" className="text-xs font-medium text-gray-300"> GitHub </a>
                                </li>

                                <li className="p-1 leading-none">
                                    <a href="#" className="text-xs font-medium text-gray-300">Website</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <ul className="mt-4 space-y-2">
                    <li>
                        <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                            <strong className="font-medium text-white">Project A</strong>

                            <p className="mt-1 text-xs font-medium text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequuntur deleniti,
                                unde ab ut in!
                            </p>
                        </a>
                    </li>

                    <li>
                        <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                            <strong className="font-medium text-white">Project B</strong>

                            <p className="mt-1 text-xs font-medium text-gray-300">
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
