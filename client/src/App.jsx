import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Interview from './pages/Interview'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <>
      <Routes> 
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoutes>
          <Dashboard/>
          </ProtectedRoutes>
          }/>
        <Route path='/interview' element={
          <ProtectedRoutes>
            <Interview/>
          </ProtectedRoutes>
          }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
