import React from 'react'

interface NotFoundProps {
    message?: string;
    menu?: boolean;
}
const NotFound = ({ message, menu }: NotFoundProps) => {
    return (
        <div className={`flex flex-col items-center justify-center h-[calc(100vh-20rem)] bg-transparent ${menu ? 'backdrop-blur-lg text-white !text-white' : ''} px-4`}>
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2">
                    {/* {message && (
                        <p className="text-gray-500 mb-6">{message}</p>
                    )}  */}
                    {message ?? "Your"} Search Is Not Found
                </h2>

                <p>Adjust your search and try again.</p>
            </div>
        </div>
    )
}

export default NotFound
