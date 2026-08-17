import React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
const Input = ({icon : Icon, type, value, ...props}) => {

  const [isEyeClicked, setisEyeClicked] = useState(false);
  const handleEyeClick = (e) => {
    e.preventDefault();
    setisEyeClicked(prev => !prev)
  }
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className="w-5 h-5 text-blue-500"/>
        </div>

        <input {...props} type={isEyeClicked ? "password" : "text"} className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition duration-200'/>

        {value.length > 0 && type=="password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              type="button"
              onClick={handleEyeClick}
              className="p-2 rounded-md text-blue-400 
                        hover:text-blue-300 
                        transition-all duration-200
                        cursor-pointer"
            >
              {isEyeClicked ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        )}
    </div>
  )
}

export default Input
