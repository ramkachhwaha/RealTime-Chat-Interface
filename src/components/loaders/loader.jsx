import React from 'react'

export default function Loader() {
    return (
        <div className='h-64 flex justify-center items-center'>
            <div className='h-25 w-25 border-t-4 border-blue-500 rounded-full animate-spin'></div>
        </div>
    )
}
