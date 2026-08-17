import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { userAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

const EmailVerification = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRef = useRef([]);

    const navigate = useNavigate();
    
   const {error, isLoading, verifyEmail, user}  = userAuthStore()

    const handleChange = (index, value) => {
        const newCode = [...code];
        
        // Hnadle Pasted Code
        if(value.length > 1) {
            const pastedCode = [...value];
            for(let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(prev => newCode);
            // Move Focus to the next input field if the value is entered
            const lastFillIndex = newCode.findLastIndex((digit) => {
                return digit != "";
            });
            const focusIndex = lastFillIndex < 5 ? lastFillIndex+1 : 5;
            inputRef.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if(value && index < 5) {
                inputRef.current[index+1].focus();
            }
        }
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const verificationCode = code.join("");
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success("Your Email is Verified");
        } catch(error) {
            const message = error.response?.data?.message;
            if (message === "The Verification code is expired") {
                navigate("/", { replace: true });
                toast.error("The Verification code is expired please singn up again...")
            }
        }
    }
    useEffect(() => {
        if(code.every(digit => digit != "")) {
            handleSumbit(new Event('sumbit'));
        }
    },[code])

    const handleKeyDown = (index, e) => {
        if(e.key == "Backspace") {
            if(index > 0) {
                inputRef.current[index-1].focus();
            }
            inputRef.current[index].value = "";
        }
    };

  return (
    <motion.div className='p-8 max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden'
    initial={{opacity: 0, y : -50}} animate={{opacity: 1, y: 0}} transition={{duration: 0.4}} >
        

        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text'>
            Verify Your Email
        </h2>
        <p className='text-center text-gray-300 mb-6 font-medium'>Enter the 6-digit code sent to your email address. {user && <span className='font-semibold text-amber-300'>{user.email}</span>}</p>

        <form className='space-y-6' onSubmit={handleSumbit}>
            <div className='flex justify-between'>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRef.current[index] = el; }}
                        type="text"
                        maxLength={6}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none"
                    />
                ))}
            </div>
            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
            
        <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:right-offset-gray-900 transition duration-200 hover:cursor-pointer'
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    type='submit'
                    disabled={isLoading}
                    >

                        {isLoading ? <span><Loader className='w-6 h-6 animate-spin mx-auto'/></span> : <span>Verify</span>}
                        
        </motion.button>
        </form>
        
    </motion.div>
  )
}

export default EmailVerification
