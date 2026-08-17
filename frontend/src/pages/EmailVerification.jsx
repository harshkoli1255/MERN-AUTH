import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { userAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { ArrowLeft, Loader } from 'lucide-react';

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

  <motion.div
  className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  {/* Main Content */}
  <div className="p-8">

    <h2 className="mb-6 text-center text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
      Verify Your Email
    </h2>

    <p className="mb-8 text-center text-sm font-medium leading-6 text-gray-300">
      Enter the 6-digit code sent to your email address.{" "}
      {user && (
        <span className="font-semibold text-amber-300">
          {user.email}
        </span>
      )}
    </p>

    <form className="space-y-6" onSubmit={handleSumbit}>

      <div className="flex justify-center gap-3">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-12 w-12 rounded-lg border-2 border-slate-700 bg-slate-800 text-center text-xl font-bold text-white outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-slate-700 focus:ring-2 focus:ring-indigo-500/20"
          />
        ))}
      </div>

      {error && (
        <p className="text-center text-sm font-semibold text-red-400">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-5 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-bold text-white shadow-lg shadow-indigo-900/30 transition-all duration-200 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <Loader className="h-6 w-6 animate-spin" />
        ) : (
          "Verify"
        )}
      </motion.button>

    </form>
  </div>

  {/* Back to Home */}
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

export default EmailVerification
