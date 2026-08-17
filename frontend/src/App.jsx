import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import FloatingShape from "./components/FlotingShape.jsx"
import Home from "./pages/Home.jsx"
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx"
import EmailVerification from "./pages/EmailVerification.jsx"
import {Toaster} from 'react-hot-toast';
import { userAuthStore } from "./store/authStore.js"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner.jsx"
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx"
import ResetPassword from "./pages/ResetPassword.jsx"

// protect routes that require authentication

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user, error} = userAuthStore();
  if(!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }
  return children;
}

const UserVerified = ({children}) => {
  const {isAuthenticated, user, error} = userAuthStore();
  if(user?.isVerified) {
    return <Navigate to="/login" replace/>
  }
  return children;
}

const RedirectAuthenticatedUser = ({children}) => {
  let {isAuthenticated, user} = userAuthStore();
  if(user?._id) {
    return <Navigate to="/" replace={true}/>
  }
  return children;
}

function App() {
  
  const location = useLocation();
  const {checkAuth, clearError, isCheckingAuth} = userAuthStore();

  useEffect(() => {
    checkAuth();
    return () => {
      clearError();
    }
  },[checkAuth, location.pathname])

  if(isCheckingAuth) {
    return <LoadingSpinner/>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-violet-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-fuchsia-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-indigo-400" size="w-32 h-32" top="50%" left="-4%" delay={2} />

      <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/signup" element={
              <RedirectAuthenticatedUser>
                <SignUp/>
              </RedirectAuthenticatedUser>
            }/>

          <Route path="/login" element={
            <RedirectAuthenticatedUser>
              <Login/>
            </RedirectAuthenticatedUser>
            }/>
          <Route path="/verify-email" element={
            <UserVerified>
              <EmailVerification/>
            </UserVerified>
          }/>

          <Route path="/forgot-password" element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage/>
            </RedirectAuthenticatedUser>
          }/>
          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <ResetPassword/>
            </RedirectAuthenticatedUser>
          }/>
        </Routes>
      <Toaster/>
    </div>
  )
}

export default App
