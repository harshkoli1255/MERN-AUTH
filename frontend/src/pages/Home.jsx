import { motion } from 'framer-motion';
import { BadgeAlert, CalendarDays, Clock3, Loader, LogOut, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userAuthStore } from '../store/authStore';
import UserDetails, { DetailItem } from '../components/UserDetails.jsx';
import {toast} from 'react-hot-toast'
const Home = () => {
  const { user, logout, isLoading, forgotPassword, signup, isResendVerificationToken, resendVerifyToken} = userAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("logout successfully");
  };

  const handleVerifyEmail = async () => {
    toast.success("verification code is sent to your inbox...");
    await resendVerifyToken();
    navigate('/verify-email');
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35 }}
      className='mx-auto mt-12 w-full max-w-md px-5'
    >
      <div className='rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-sm'>
        <div className='mb-8 flex items-center gap-4'>
          <div className='flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20'>
            <UserRound className='h-5 w-5' />
          </div>
          <div>
            <p className='text-sm text-slate-400'>Welcome back</p>
            <h1 className='text-2xl font-semibold tracking-tight text-white'>
              {user?.name || 'Your profile'}
            </h1>
          </div>
        </div>

        <div className='border-t border-white/10 pt-5'>
          <p className='mb-3 text-sm font-medium text-slate-300'>Account details</p>
          <UserDetails user={user} />
        </div>

        <div className='mt-6 border-t border-white/10 pt-5'>
          <p className='mb-3 text-sm font-medium text-slate-300'>Account activity</p>
          <div className='space-y-3'>
            <DetailItem
              icon={Clock3}
              label='Last login'
              value={user?.lastLogin && new Date(user.lastLogin).toLocaleString('en-IN')}
            />
            <DetailItem
              icon={CalendarDays}
              label='Account created'
              value={user?.createdAt && new Date(user.createdAt).toLocaleString('en-IN')}
            />
          </div>
        </div>

        <div className='mt-6 space-y-3 border-t border-white/10 pt-5'>        
        {
          !user?.isVerified && 
          (<button
          type='button'
          onClick={handleVerifyEmail}
          disabled={isResendVerificationToken}
          className='flex w-full items-center hover:cursor-pointer justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-blue-400 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900'
          >
            {isResendVerificationToken ? <Loader className='h-5 w-5 animate-spin' /> : <BadgeAlert className='h-4 w-4'/>}
            
            Verify email
          </button>)
        }

          <button
            type='button'
            onClick={handleLogout}
            disabled={isLoading}
            className='flex w-full items-center hover:cursor-pointer justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:border-red-300/35 hover:bg-red-500/20 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isLoading ? <Loader className='h-5 w-5 animate-spin' /> : <LogOut className='h-4 w-4' />}
            {isLoading ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home
