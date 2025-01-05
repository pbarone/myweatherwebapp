import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Posts:</h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            <li>
                Post 1
            </li>
            <li>
                Post 2
            </li>
            <li>
                Post 3
            </li>
        </ul>

                <p>
        <Link  href="/posts/new">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">New Post</button>
        </Link>
        </p>
    </div>


  )
}

export default page