import React from 'react'

const Loader = ({message = "Loading..."}) => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#f8f9ff] dark:bg-zinc-900">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#c2c8c5] dark:border-zinc-600 border-t-[#006c49]" />

        <p className="text-sm font-medium text-[#424846] dark:text-zinc-300">
          {message}
        </p>
      </div>
    </div>
  )
}

export default Loader