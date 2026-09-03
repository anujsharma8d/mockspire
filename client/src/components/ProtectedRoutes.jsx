import {useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import api from '../api/axios';

const ProtectedRoutes = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        const verifyToken= async()=>{
            const token = localStorage.getItem("token");
            
            if(!token){
                setAuthenticated(false);
                setLoading(false);
                return;
            }

            try{
                await api.get("api/auth/verify",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })

                setAuthenticated(true)
            }catch (error) {
                console.log("Invalid or expired token");

                localStorage.removeItem("token");

                setAuthenticated(false);
            } finally{
                setLoading(false);
            }

        }

        verifyToken();

    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoutes
