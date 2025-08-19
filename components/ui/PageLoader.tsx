import { Loader2 } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
         <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400"><Loader2 className="animate-spin text-indigo-600 w-6 h-6" /></p>
      </div>
  )
}

export default PageLoader
