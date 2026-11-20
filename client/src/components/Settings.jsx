import { useState } from 'react'
import ThemeToggle from "./ThemeToggle";
import DeletePopUp from './DeletePopUp';

const Settings = () => {
    const [showPopUp, setShowPopUp] = useState(false)

  return (
    <div className='flex flex-col justify-center gap-5'>
        <h2 className='font-bold text-2xl'>Settings</h2>
        <div className='border'></div>
        <div className='flex items-center justify-between gap-5'>
            <p className='font-bold'>Change theme </p>
            <div className='border border-grey-500 rounded-xl flex justify-between'>
                <ThemeToggle/>
            </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-5 border border-red-600 p-5 rounded-xl'>
            <div>
                <div className='font-bold'>Delete Your Account</div>
                <div>
                    Once you delete your Account, there is no going back. Please be certain.
                </div>
            </div>
            <button onClick={()=>setShowPopUp(true)} className='p-2 border border-red-500 dark:bg-zinc-700 bg-gray-100 text-red-500 font-semibold rounded-xl'>Delete Account</button>

            {
                showPopUp && 

                <div className="fixed inset-0 z-[105] flex items-center justify-center bg-black/50" >
                    <div className="max-w-[90vw] relative rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-8 shadow-sm">
                        <DeletePopUp/>
                    <button
                    onClick={() => setShowPopUp(false)}
                    className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow"
                    >
                    ✕
                    </button>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Settings
