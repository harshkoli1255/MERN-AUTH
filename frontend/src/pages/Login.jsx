import { useEffect, useState } from "react"
import { motion } from 'framer-motion';
import {Mail, Lock, Loader} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from "../components/Input";
import { userAuthStore } from "../store/authStore";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, isLoading, error} = userAuthStore();
    const navigate = useNavigate();
    const handleLogin = async(e) => {
        e.preventDefault();
        await login(email, password);
        navigate("/");
    }
  return (
        <motion.div 
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden" >

            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 text-transparent bg-clip-text">Login</h2>

                <form onSubmit={handleLogin}>
                    <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="flex items-center">
                        <Link to='/forgot-password' className="text-sm text-blue-400 hover:underline">
                        Forgot Password?
                        </Link>
                    </div>
                    {error && <p className="text-red-500 font-semibold text-sm mt-4">{error}</p>}
                    
                    <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:right-offset-gray-900 transition duration-200 hover:cursor-pointer'
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                type='submit'
                                disabled={isLoading}
                                >   
                                    {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto"/> : <span>Login</span>}
                    </motion.button>

                </form>
            </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400 '>
                        Don't have an Account?{" "}
                        <Link to="/signup" className='text-blue-400 hover:underline'>Create An account</Link>
                    </p>
                </div>
        </motion.div>

  )
}

export default Login
