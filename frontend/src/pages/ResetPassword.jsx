import { motion } from 'framer-motion';
import Input from '../components/Input.jsx';
import {Lock, Loader, ArrowLeft} from 'lucide-react';
import { userAuthStore } from '../store/authStore.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const { isLoading, error, message, resetPassword } = userAuthStore();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const {token} = useParams();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password == confirmPassword) {
            await resetPassword(token, password);
            toast.success("Password reset successfully, redirecting to login page...")
            setTimeout(() => {
              navigate("/login")
            }, 2000)
        } else {
            toast.error("Password not match");
        } 
    }

    useEffect(() => {
        if(password.length && confirmPassword.length && password!=confirmPassword) {
            setIsPasswordMatch(prev => false);
        } else {
            setIsPasswordMatch(prev => true);
        }
    },[password, confirmPassword])
  return (
    <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.4}}
    className="max-w-md w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl">
      <div className='p-8'>
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 text-transparent bg-clip-text">Reset Password</h2>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <Input icon={Lock} type="password" placeholder="New Password" required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <Input icon={Lock} type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) =>{setConfirmPassword(e.target.value)} }/>
                {!isPasswordMatch ? <span className='font-semibold text-red-500 mt-2'>Password Not Match</span> : (password && confirmPassword && password==confirmPassword ? <span className='font-semibold text-green-500 mt-2'>Password Match</span> : null)}
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                {message && <p className='text-green-600 font-semibold mt-2'>{message}</p>}
               
                <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:right-offset-gray-900 transition duration-200 hover:cursor-pointer'
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        type='submit'
                        disabled={isLoading}
                        >

                        {isLoading ? <span><Loader className='w-6 h-6 animate-spin mx-auto'/></span> : <span>Set New Password</span>}
                            
                </motion.button>

            </form>
      </div>

        <div className="border-t border-white/10 bg-gradient-to-r from-slate-950/60 via-indigo-950/30 to-slate-950/60 px-6 py-5">
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">

      <p className="text-sm text-slate-400">
        Want to return home?
      </p>

      <Link
        to="/"
        className="group inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200 shadow-sm shadow-blue-950/30 transition duration-200 hover:border-blue-300/40 hover:bg-blue-400/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </Link>

    </div>
  </div>
    </motion.div>
  )
}

export default ResetPassword
