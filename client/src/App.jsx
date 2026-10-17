import './App.css'
import { useTheme } from './context/ThemeContext'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Setup from './pages/Setup'
import Interview from './pages/Interview'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoutes from './components/ProtectedRoutes'
import Result from './pages/Result'
import RecentActivity from './pages/RecentActivityPage'
import FAQ from './pages/FAQ'
import { ToastContainer } from 'react-toastify'
import NotFound from './pages/NotFound'

function App() {
  const { theme } = useTheme()

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoutes>
          <Dashboard/>
          </ProtectedRoutes>
          }/>
        <Route path='/faq' element={
          <ProtectedRoutes>
          <FAQ/>
          </ProtectedRoutes>
          }/>
        <Route path='/setup' element={
          <ProtectedRoutes>
          <Setup/>
          </ProtectedRoutes>
          }/>
        <Route path='/interview/:sessionId' element={
          <ProtectedRoutes>
            <Interview/>
          </ProtectedRoutes>
          }/>
        <Route path='/recentactivity' element={
          <ProtectedRoutes>
                <RecentActivity/>
          </ProtectedRoutes>
              }/>
        <Route path='/results/:interviewId' element={
          <ProtectedRoutes>
            <Result/>
          </ProtectedRoutes>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>

      <ToastContainer theme={theme} position="top-right" autoClose={3000} progressClassName="toast-progress"/>

    </>
  )
}

export default App
