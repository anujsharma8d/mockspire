import { useState,useEffect } from 'react'
import deleteAccount from '../api/userapi'
import { useNavigate } from 'react-router-dom'

const DeletePopUp = () => {
    const navigate = useNavigate()
    const [confirmation, setConfirmation] = useState("")
    const isDisabled = confirmation.trim().toLowerCase() !== "confirm"

    const handleDelete = async()=>{
        try{
            const res = await deleteAccount()
    
            if(res.status==200){
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
        catch(err){
            console.log(err.response?.data?.message || err.message)
        }
    }
    
    
  return (
      <div className='flex flex-col justify-center items-start gap-5'>
        <div>
            To delete the account, type "confirm" in the box below
        </div>
        <input type="text" value={confirmation} onChange={(e)=>setConfirmation(e.target.value)} className='dark:bg-gray-500 bg-gray-100 border border-gray-500 p-1'/>
        <button onClick={handleDelete} disabled={isDisabled} className='p-2 border border-red-500 dark:bg-zinc-700 bg-gray-100 text-red-500 font-semibold rounded-xl'>Delete Account</button>

      </div>
  )
}

export default DeletePopUp
