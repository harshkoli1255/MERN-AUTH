import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Input from '../components/Input';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { userAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {isLoading, error, forgotPassword} = userAuthStore();
    const navigate = useNavigate();
    const handleSumbit = async (e) => {
        e.preventDefault();
        await forgotPassword(email)
        setIsSubmitted(true);
        toast.success("Reset link sent to your index...")
    }

  return (
    <motion.div 
    initial={{opacity: 0, y : 20}} 
    animate={{opacity: 1, y: 0}} 
    transition={{duration: 0.4}} 
    className="max-w-md w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl" >
        <div className='border-b border-white/10 bg-gradient-to-br from-indigo-500/15 via-slate-900/30 to-transparent px-8 pb-7 pt-8 text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-400/25'>
            <Mail className='h-5 w-5' />
          </div>
          <h2 className='bg-gradient-to-r from-cyan-200 via-violet-200 to-fuchsia-200 bg-clip-text text-3xl font-bold text-transparent'>Forgot password?</h2>
          {!isSubmitted && (
            <p className='mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-300'>
              Enter your email address and we’ll send you a link to reset your password.
            </p>
          )}
        </div>
        
        <div className='p-8'>

            {
                !isSubmitted ? (
                    <form onSubmit={handleSumbit} className='space-y-1'>
                        <Input icon={Mail} type='email' placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        {error && <p className='mt-2 text-sm font-medium text-red-400'>{error}</p>}
                        <motion.button className='mt-2 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:from-blue-400 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60'
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    type='submit'
                                    disabled={isLoading}
                                    >

                                        {isLoading ? <span><Loader className='w-6 h-6 animate-spin mx-auto'/></span> : <span>Send Reset Link</span>}
                        </motion.button>
                    </form>            

                )
                :
                (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className='flex flex-col items-center rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] px-6 py-8 text-center'>
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/25">
                            <Mail className='h-6 w-6'/>
                        </div>
                        <h3 className='text-lg font-semibold text-white'>Check your inbox</h3>
                        <p className='mt-2 text-sm leading-6 text-slate-300'>If an account exists for <span className='font-medium text-white'>{email}</span>, you’ll receive a password reset link shortly.</p>
                    </motion.div>
                )
            }

        </div>

        <div className='border-t border-white/10 bg-gradient-to-r from-slate-950/60 via-indigo-950/30 to-slate-950/60 px-6 py-5'>
          <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-between'>
            <p className='text-sm text-slate-400'>Remembered your password?</p>
            <Link
              to='/login'
              className='group inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200 shadow-sm shadow-blue-950/30 transition duration-200 hover:border-blue-300/40 hover:bg-blue-400/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2 focus:ring-offset-slate-950'
            >
              <ArrowLeft className='h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1' />
              <span>Back to login</span>
            </Link>
          </div>
        </div>

    </motion.div>
  )
}

export default ForgotPasswordPage
